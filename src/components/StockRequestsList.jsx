import React, { useState, useEffect } from "react";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "./Loader";

const StockRequestsList = () => {
  const { showLoader, hideLoader } = useLoader();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    branch: "",
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const isBranchUser =
    typeof user?.role === "string" && user.role.startsWith("branch_");

  const canViewRequestDetails = (request) => {
    // Admin and warehouse staff can view all requests
    if (user?.role === "admin" || user?.role === "warehouse_staff") {
      return true;
    }

    // Branch users can only view requests from their own branch
    if (isBranchUser && request.branch_id === user?.branch_id) {
      return true;
    }

    return false;
  };

  const canApproveRejectRequests = () => {
    // Only admin and warehouse staff can approve/reject requests
    return user?.role === "admin" || user?.role === "warehouse_staff";
  };

  const canManageWarehouseActions = () => {
    // Only admin and warehouse staff can dispatch requests
    return user?.role === "admin" || user?.role === "warehouse_staff";
  };

  const canMarkAsDelivered = (request) => {
    // Only branch managers can mark as delivered, and only for their own branch
    return (
      user?.role === "branch_manager" && request.branch_id === user?.branch_id
    );
  };

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      // Simulate 3-second loading time
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.priority) queryParams.append("priority", filters.priority);
      if (filters.branch) queryParams.append("branch_id", filters.branch);

      const res = await api.get(`/stock-requests?${queryParams.toString()}`);
      const payload = res.data;
      setRequests(payload?.data || payload || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId, items) => {
    try {
      showLoader("Approving request...", true);

      await api.post(`/stock-requests/${requestId}/approve`, {
        items: items.map((item) => ({
          product_id: item.product_id,
          approved_qty: item.approved_qty || item.requested_qty,
        })),
        approval_notes: "Approved via dashboard",
      });

      fetchRequests();
      setShowDetails(false);
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request");
    } finally {
      hideLoader();
    }
  };

  const handleReject = async (requestId, reason) => {
    try {
      showLoader("Rejecting request...", true);

      await api.post(`/stock-requests/${requestId}/reject`, {
        rejection_reason: reason,
      });

      fetchRequests();
      setShowDetails(false);
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    } finally {
      hideLoader();
    }
  };

  const handleDispatch = async (requestId) => {
    try {
      showLoader("Dispatching request...", true);

      await api.post(`/stock-requests/${requestId}/dispatch`);

      fetchRequests();
      setShowDetails(false);
    } catch (error) {
      console.error("Error dispatching request:", error);
      alert("Failed to dispatch request");
    } finally {
      hideLoader();
    }
  };

  const handleDeliver = async (requestId) => {
    try {
      showLoader("Marking as delivered...", true);

      await api.post(`/stock-requests/${requestId}/deliver`);

      fetchRequests();
      setShowDetails(false);
    } catch (error) {
      console.error("Error marking as delivered:", error);
      alert("Failed to mark as delivered");
    } finally {
      hideLoader();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-900 bg-yellow-100 border border-yellow-200 dark:text-yellow-100 dark:bg-yellow-900/30 dark:border-yellow-700";
      case "approved":
        return "text-blue-900 bg-blue-100 border border-blue-200 dark:text-blue-100 dark:bg-blue-900/30 dark:border-blue-700";
      case "dispatched":
        return "text-cyan-900 bg-cyan-100 border border-cyan-200 dark:text-cyan-100 dark:bg-cyan-900/30 dark:border-cyan-700";
      case "delivered":
        return "text-green-900 bg-green-100 border border-green-200 dark:text-green-100 dark:bg-green-900/30 dark:border-green-700";
      case "rejected":
        return "text-red-900 bg-red-100 border border-red-200 dark:text-red-100 dark:bg-red-900/30 dark:border-red-700";
      default:
        return "text-gray-700 bg-gray-100 border border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-red-900 bg-red-100 border border-red-200 dark:text-red-100 dark:bg-red-900/30 dark:border-red-700";
      case "high":
        return "text-orange-900 bg-orange-100 border border-orange-200 dark:text-orange-100 dark:bg-orange-900/30 dark:border-orange-700";
      case "normal":
        return "text-blue-900 bg-blue-100 border border-blue-200 dark:text-blue-100 dark:bg-blue-900/30 dark:border-blue-700";
      case "low":
        return "text-gray-600 bg-gray-100 border border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
      default:
        return "text-gray-700 bg-gray-100 border border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
    }
  };

  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <Loader message="Loading Stock Requests..." showBackground={false} />
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Stock Requests</h1>
          <p className="text-on-surface-variant">
            Manage and track inventory requests
          </p>
        </div>
        {/* Show Create New Request button only for branch users */}
        {isBranchUser && (
          <button
            onClick={() => navigate("/stock/new")}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Create New Request
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full p-2 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="dispatched">Dispatched</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priority: e.target.value }))
              }
              className="w-full p-2 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
            >
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Branch
            </label>
            <select
              value={filters.branch}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, branch: e.target.value }))
              }
              className="w-full p-2 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
            >
              <option value="">All Branches</option>
              {/* Add branch options dynamically */}
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="hidden lg:block">
              <table className="w-full">
                <thead className="bg-surface-container">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Request Code
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Branch
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden xl:table-cell">
                      Created
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {requests.length > 0 ? (
                    requests.map((request) => (
                      <tr
                        key={request.id}
                        className="hover:bg-surface-container"
                      >
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {request.code}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {request.branch?.name}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                            {request.items?.length || 0} items
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            ${parseFloat(request.total_value || 0).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}
                          >
                            {request.priority || "normal"}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(request.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          {canViewRequestDetails(request) ? (
                            <button
                              onClick={() => viewRequestDetails(request)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold transition-colors"
                            >
                              View Details
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-medium">
                            No stock requests found
                          </span>
                          <span className="text-sm mt-1">
                            Try adjusting your filters or create a new request
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {request.code}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.branch?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        by {request.creator?.name}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}
                      >
                        {request.priority || "normal"}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Items
                      </span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {request.items?.length || 0} items
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Value
                      </span>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        ${parseFloat(request.total_value || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                    {canViewRequestDetails(request) ? (
                      <button
                        onClick={() => viewRequestDetails(request)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold transition-colors"
                      >
                        View Details
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-medium">
                      No stock requests found
                    </span>
                    <span className="text-sm mt-1">
                      Try adjusting your filters or create a new request
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Request Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedRequest.code}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedRequest.branch?.name} • Created by{" "}
                    {selectedRequest.creator?.name} (
                    {selectedRequest.creator?.email})
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                    close
                  </span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Request Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Request Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Status:
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedRequest.status)}`}
                      >
                        {selectedRequest.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Priority:
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedRequest.priority)}`}
                      >
                        {selectedRequest.priority || "normal"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Value:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        $
                        {parseFloat(selectedRequest.total_value || 0).toFixed(
                          2,
                        )}
                      </span>
                    </div>
                    {selectedRequest.expected_delivery_date && (
                      <div className="flex justify-between">
                        <span className="text-sm text-on-surface-variant">
                          Expected Delivery:
                        </span>
                        <span className="text-sm text-on-surface">
                          {selectedRequest.expected_delivery_date}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-on-surface mb-3">
                    Additional Info
                  </h3>
                  <div className="space-y-2">
                    {selectedRequest.reason && (
                      <div>
                        <span className="text-sm text-on-surface-variant">
                          Reason:
                        </span>
                        <p className="text-sm text-on-surface">
                          {selectedRequest.reason}
                        </p>
                      </div>
                    )}
                    {selectedRequest.cost_center && (
                      <div className="flex justify-between">
                        <span className="text-sm text-on-surface-variant">
                          Cost Center:
                        </span>
                        <span className="text-sm text-on-surface">
                          {selectedRequest.cost_center}
                        </span>
                      </div>
                    )}
                    {selectedRequest.tracking_number && (
                      <div className="flex justify-between">
                        <span className="text-sm text-on-surface-variant">
                          Tracking Number:
                        </span>
                        <span className="text-sm text-on-surface">
                          {selectedRequest.tracking_number}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-on-surface mb-3">
                  Requested Items
                </h3>
                <div className="space-y-2">
                  {selectedRequest.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-surface-container rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-on-surface">
                          {item.product?.name}
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          {item.product?.sku}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-on-surface-variant">
                            Requested
                          </p>
                          <p className="font-medium text-on-surface">
                            {item.requested_qty}
                          </p>
                        </div>
                        {item.approved_qty && (
                          <div className="text-center">
                            <p className="text-xs text-on-surface-variant">
                              Approved
                            </p>
                            <p className="font-medium text-primary">
                              {item.approved_qty}
                            </p>
                          </div>
                        )}
                        {item.dispatched_qty && (
                          <div className="text-center">
                            <p className="text-xs text-on-surface-variant">
                              Dispatched
                            </p>
                            <p className="font-medium text-info">
                              {item.dispatched_qty}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {(selectedRequest.note ||
                selectedRequest.approval_notes ||
                selectedRequest.rejection_reason) && (
                <div className="mb-6">
                  <h3 className="font-semibold text-on-surface mb-3">Notes</h3>
                  {selectedRequest.note && (
                    <div className="mb-2">
                      <span className="text-sm text-on-surface-variant">
                        Request Note:
                      </span>
                      <p className="text-sm text-on-surface">
                        {selectedRequest.note}
                      </p>
                    </div>
                  )}
                  {selectedRequest.approval_notes && (
                    <div className="mb-2">
                      <span className="text-sm text-on-surface-variant">
                        Approval Notes:
                      </span>
                      <p className="text-sm text-on-surface">
                        {selectedRequest.approval_notes}
                      </p>
                    </div>
                  )}
                  {selectedRequest.rejection_reason && (
                    <div className="mb-2">
                      <span className="text-sm text-on-surface-variant">
                        Rejection Reason:
                      </span>
                      <p className="text-sm text-error">
                        {selectedRequest.rejection_reason}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3">
                {selectedRequest.status === "pending" &&
                  canApproveRejectRequests() && (
                    <>
                      <button
                        onClick={() => {
                          const reason = prompt(
                            "Please enter rejection reason:",
                          );
                          if (reason) handleReject(selectedRequest.id, reason);
                        }}
                        className="px-4 py-2 bg-error text-on-error rounded-lg hover:opacity-90"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleApprove(
                            selectedRequest.id,
                            selectedRequest.items,
                          )
                        }
                        className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90"
                      >
                        Approve
                      </button>
                    </>
                  )}
                {selectedRequest.status === "approved" &&
                  canManageWarehouseActions() && (
                    <button
                      onClick={() => handleDispatch(selectedRequest.id)}
                      className="px-4 py-2 bg-info text-on-info rounded-lg hover:opacity-90"
                    >
                      Dispatch
                    </button>
                  )}
                {selectedRequest.status === "dispatched" &&
                  canMarkAsDelivered(selectedRequest) && (
                    <button
                      onClick={() => handleDeliver(selectedRequest.id)}
                      className="px-4 py-2 bg-success text-on-success rounded-lg hover:opacity-90"
                    >
                      Mark as Delivered
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockRequestsList;
