import React, { useState, useEffect } from "react";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.priority) queryParams.append("priority", filters.priority);
      if (filters.branch) queryParams.append("branch_id", filters.branch);

      const response = await fetch(`/api/stock-requests?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setRequests(data.data || data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId, items) => {
    try {
      showLoader("Approving request...", true);

      const response = await fetch(`/api/stock-requests/${requestId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product_id,
            approved_qty: item.approved_qty || item.requested_qty,
          })),
          approval_notes: "Approved via dashboard",
        }),
      });

      if (response.ok) {
        fetchRequests();
        setShowDetails(false);
      } else {
        throw new Error("Failed to approve request");
      }
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

      const response = await fetch(`/api/stock-requests/${requestId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          rejection_reason: reason,
        }),
      });

      if (response.ok) {
        fetchRequests();
        setShowDetails(false);
      } else {
        throw new Error("Failed to reject request");
      }
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

      const response = await fetch(
        `/api/stock-requests/${requestId}/dispatch`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.ok) {
        fetchRequests();
        setShowDetails(false);
      } else {
        throw new Error("Failed to dispatch request");
      }
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

      const response = await fetch(`/api/stock-requests/${requestId}/deliver`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetchRequests();
        setShowDetails(false);
      } else {
        throw new Error("Failed to mark as delivered");
      }
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
        return "text-warning bg-warning-container";
      case "approved":
        return "text-primary bg-primary-container";
      case "dispatched":
        return "text-info bg-info-container";
      case "delivered":
        return "text-success bg-success-container";
      case "rejected":
        return "text-error bg-error-container";
      default:
        return "text-on-surface bg-surface-container";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-error bg-error-container";
      case "high":
        return "text-warning bg-warning-container";
      case "normal":
        return "text-primary bg-primary-container";
      case "low":
        return "text-secondary bg-secondary-container";
      default:
        return "text-on-surface bg-surface-container";
    }
  };

  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  if (loading) {
    return <div className="p-6">Loading stock requests...</div>;
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
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Request Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request.id} className="hover:bg-surface-container">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-on-surface">
                        {request.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-on-surface-variant">
                        {request.branch?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-on-surface">
                        {request.items?.length || 0} items
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-on-surface">
                        ${(request.total_value || 0).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}
                      >
                        {request.priority || "normal"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-on-surface-variant">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => viewRequestDetails(request)}
                        className="text-primary hover:text-primary-hover text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center text-on-surface-variant"
                  >
                    No stock requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface-container-lowest rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-outline-variant/10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-on-surface">
                    {selectedRequest.code}
                  </h2>
                  <p className="text-on-surface-variant">
                    {selectedRequest.branch?.name} • Created by{" "}
                    {selectedRequest.creator?.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-surface-container rounded-lg"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Request Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-on-surface mb-3">
                    Request Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-variant">
                        Status:
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}
                      >
                        {selectedRequest.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-variant">
                        Priority:
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}
                      >
                        {selectedRequest.priority || "normal"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-variant">
                        Total Value:
                      </span>
                      <span className="font-medium text-on-surface">
                        ${(selectedRequest.total_value || 0).toFixed(2)}
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
                {selectedRequest.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        const reason = prompt("Please enter rejection reason:");
                        if (reason) handleReject(selectedRequest.id, reason);
                      }}
                      className="px-4 py-2 bg-error text-on-error rounded-lg hover:opacity-90"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        handleApprove(selectedRequest.id, selectedRequest.items)
                      }
                      className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90"
                    >
                      Approve
                    </button>
                  </>
                )}
                {selectedRequest.status === "approved" && (
                  <button
                    onClick={() => handleDispatch(selectedRequest.id)}
                    className="px-4 py-2 bg-info text-on-info rounded-lg hover:opacity-90"
                  >
                    Dispatch
                  </button>
                )}
                {selectedRequest.status === "dispatched" && (
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
