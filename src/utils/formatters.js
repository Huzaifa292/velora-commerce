import { format, parseISO } from 'date-fns';

/**
 * Format a number to currency
 */
export const formatPrice = (amount, currencySymbol = '$') => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currencySymbol}0.00`;
  return `${currencySymbol}${Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format date string or object
 */
export const formatDate = (dateString, formatPattern = 'MMM dd, yyyy') => {
  if (!dateString) return 'N/A';
  try {
    const d = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(d, formatPattern);
  } catch {
    return String(dateString).slice(0, 10);
  }
};

/**
 * Generate a unique realistic Order ID
 */
export const generateOrderId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VEL-${new Date().getFullYear()}-${rand}`;
};

/**
 * Generate a SKU code
 */
export const generateSKU = (category = 'GEN', name = 'ITEM') => {
  const cat = (category || 'GEN').substring(0, 3).toUpperCase();
  const n = (name || 'ITM').substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `VEL-${cat}-${n}-${rand}`;
};

/**
 * Export JSON array of objects to CSV download
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) =>
    headers
      .map((header) => {
        const val = obj[header];
        if (typeof val === 'object' && val !== null) {
          return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
        }
        return `"${String(val !== undefined && val !== null ? val : '').replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
