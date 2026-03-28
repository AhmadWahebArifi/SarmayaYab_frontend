import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import api from "../services/api";

const InventoryDashboard = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    summary: {},
    recentRequests: [],
    lowStockAlerts: [],
    topProducts: [],
    requestTrends: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Simulate 3-second loading time
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await api.get("/analytics/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader message={t("loader.loadingDashboard")} showBackground={false} />
    );
  }

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">
            {t("dashboard.title")}
          </h1>
          <p className="text-on-surface-variant mt-2">
            {t("dashboard.subtitle")}
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">refresh</span>
          {t("common.refresh")}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-on-surface-variant">
              {t("dashboard.totalRequests")}
            </span>
            <span className="material-symbols-outlined text-primary">
              request_quote
            </span>
          </div>
          <p className="text-2xl font-bold text-on-surface">
            {dashboardData.summary.total_requests || 0}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            {t("dashboard.allTime")}
          </p>
        </div>

        <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-on-surface-variant">
              {t("dashboard.pending")}
            </span>
            <span className="material-symbols-outlined text-warning">
              hourglass_empty
            </span>
          </div>
          <p className="text-2xl font-bold text-warning">
            {dashboardData.summary.pending_requests || 0}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            {t("dashboard.awaitingApproval")}
          </p>
        </div>

        <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-on-surface-variant">
              {t("dashboard.approved")}
            </span>
            <span className="material-symbols-outlined text-primary">
              check_circle
            </span>
          </div>
          <p className="text-2xl font-bold text-primary">
            {dashboardData.summary.approved_requests || 0}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            {t("dashboard.readyToDispatch")}
          </p>
        </div>

        <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-on-surface-variant">
              {t("dashboard.urgent")}
            </span>
            <span className="material-symbols-outlined text-error">
              priority_high
            </span>
          </div>
          <p className="text-2xl font-bold text-error">
            {dashboardData.summary.urgent_requests || 0}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            {t("dashboard.highPriority")}
          </p>
        </div>

        <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-on-surface-variant">
              {t("dashboard.totalValue")}
            </span>
            <span className="material-symbols-outlined text-primary">
              payments
            </span>
          </div>
          <p className="text-2xl font-bold text-primary">
            ${parseFloat(dashboardData.summary.total_value || 0).toFixed(2)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            {t("dashboard.allRequests")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="p-6 border-b border-outline-variant/10">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-on-surface">
                {t("dashboard.recentRequests")}
              </h2>
              <span className="text-sm text-on-surface-variant">
                {t("dashboard.lastRequests", {
                  count: dashboardData.recentRequests?.length || 0,
                })}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.recentRequests?.length > 0 ? (
                dashboardData.recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-on-surface">
                          {request.code}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                        >
                          {request.status}
                        </span>
                        {request.priority !== "normal" && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}
                          >
                            {request.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-on-surface-variant">
                        {request.branch?.name} • {request.items?.length || 0}{" "}
                        items • $
                        {parseFloat(request.total_value || 0).toFixed(2)}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Created by {request.creator?.name} •{" "}
                        {new Date(request.created_at).toLocaleDateString()} at{" "}
                        {new Date(request.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-on-surface">
                        ${parseFloat(request.total_value || 0).toFixed(2)}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {request.creator?.email}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-on-surface-variant py-8">
                  {t("dashboard.noRecentRequests")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="p-6 border-b border-outline-variant/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-warning">
                  warning
                </span>
                {t("dashboard.lowStockAlerts")}
              </h2>
              <span className="px-2 py-1 bg-warning text-on-warning rounded-full text-xs font-medium">
                {t("dashboard.criticalItems", {
                  count: dashboardData.lowStockAlerts?.length || 0,
                })}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {dashboardData.lowStockAlerts?.length > 0 ? (
                dashboardData.lowStockAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="p-3 bg-error-container/10 rounded-lg border border-error/20 hover:bg-error-container/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-on-surface text-sm">
                        {alert.product?.name}
                      </p>
                      <span className="text-xs text-error font-medium">
                        CRITICAL
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-1">
                      SKU: {alert.product?.sku}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-on-surface-variant">
                        Current:{" "}
                        <span className="font-medium text-error">
                          {alert.quantity || alert.current_stock}
                        </span>{" "}
                        • Reorder at:{" "}
                        <span className="font-medium">
                          {alert.product?.reorder_point}
                        </span>
                      </p>
                      <button className="text-xs text-primary hover:text-primary-hover font-medium">
                        Reorder Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-success text-3xl mb-2">
                    check_circle
                  </span>
                  <p className="text-on-surface-variant text-sm">
                    {t("dashboard.noLowStockAlerts")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="p-6 border-b border-outline-variant/10">
            <h2 className="text-lg font-semibold text-on-surface">
              {t("dashboard.topProducts")}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {dashboardData.topProducts?.length > 0 ? (
                dashboardData.topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-on-surface text-sm">
                          {product.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {product.sku}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-on-surface text-sm">
                        {product.request_count} requests
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {product.total_quantity} units
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-on-surface-variant py-8 text-sm">
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Request Status Summary */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="p-6 border-b border-outline-variant/10">
            <h2 className="text-lg font-semibold text-on-surface">
              {t("dashboard.requestSummary")}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">
                  {t("dashboard.pending")}
                </span>
                <span className="font-medium text-warning">
                  {dashboardData.summary.pending_requests || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">
                  {t("dashboard.approved")}
                </span>
                <span className="font-medium text-primary">
                  {dashboardData.summary.approved_requests || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">
                  {t("stockRequests.statuses.dispatched")}
                </span>
                <span className="font-medium text-info">
                  {dashboardData.summary.dispatched_requests || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">
                  {t("stockRequests.statuses.delivered")}
                </span>
                <span className="font-medium text-success">
                  {dashboardData.summary.delivered_requests || 0}
                </span>
              </div>
              <div className="pt-4 border-t border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-on-surface">Total</span>
                  <span className="font-bold text-primary">
                    {dashboardData.summary.total_requests || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
