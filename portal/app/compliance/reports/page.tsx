'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface ComplianceReport {
  id: string;
  reportType: string;
  title: string;
  period: string;
  format: string;
  fileUrl?: string;
  generatedBy?: string;
  createdAt: string;
}

export default function ComplianceReportsPage() {
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  // New report form
  const [reportType, setReportType] = useState('MONTHLY');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState('json');

  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch('/api/compliance/reports');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const data = await res.json();
      setReports(data.reports);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();

    // Set default dates (last 30 days)
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  }, [fetchReports]);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/compliance/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportType,
          startDate,
          endDate,
          format,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      setShowCreateModal(false);
      fetchReports();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  const handleExport = async (reportId: string, exportFormat: string) => {
    try {
      const res = await fetch(`/api/compliance/reports/${reportId}/export?format=${exportFormat}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      if (exportFormat === 'csv') {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compliance-report-${reportId}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compliance-report-${reportId}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export report');
    }
  };

  const reportTypeLabels: Record<string, string> = {
    DAILY_SUMMARY: 'Daily Summary',
    WEEKLY: 'Weekly Report',
    MONTHLY: 'Monthly Report',
    SAR: 'Suspicious Activity Report',
    AUDIT: 'Audit Report',
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Compliance Reports</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] transition-colors"
        >
          Generate Report
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
          <svg
            className="w-12 h-12 mx-auto text-[#6A6A6A] mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-[#6A6A6A] mb-4">No reports generated yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="text-[#2855FF] hover:text-[#1E44CC] font-medium"
          >
            Generate your first report
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F5F6F7] border-b border-[#E6E7E9]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Report
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Period
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E7E9]">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-[#F5F6F7]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-black">{report.title}</p>
                    {report.generatedBy && (
                      <p className="text-xs text-[#6A6A6A]">by {report.generatedBy}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6A6A6A]">
                    {reportTypeLabels[report.reportType] || report.reportType}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6A6A6A]">{report.period}</td>
                  <td className="px-4 py-3 text-sm text-[#6A6A6A]">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/compliance/reports/${report.id}`}
                        className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleExport(report.id, 'csv')}
                        className="text-[#6A6A6A] hover:text-black text-sm font-medium"
                      >
                        CSV
                      </button>
                      <button
                        onClick={() => handleExport(report.id, 'json')}
                        className="text-[#6A6A6A] hover:text-black text-sm font-medium"
                      >
                        JSON
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Generate Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-black mb-4">Generate Compliance Report</h2>
            <form onSubmit={handleGenerateReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                >
                  <option value="DAILY_SUMMARY">Daily Summary</option>
                  <option value="WEEKLY">Weekly Report</option>
                  <option value="MONTHLY">Monthly Report</option>
                  <option value="SAR">Suspicious Activity Report</option>
                  <option value="AUDIT">Audit Report</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[#6A6A6A] hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={generating}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] disabled:opacity-50 transition-colors"
                >
                  {generating ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
