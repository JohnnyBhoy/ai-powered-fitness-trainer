import React from 'react';
import { InvoiceData, InvoiceItem } from '../types/invoice';

interface Props {
  data: InvoiceData;
}

const Invoice: React.FC<Props> = ({ data }) => {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const tax = subtotal * data.taxRate;
  const total = subtotal + tax;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-md font-sans">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">INVOICE</h1>
          <p className="text-sm text-gray-500">#{data.invoiceNumber}</p>
          <p className="text-sm text-gray-500">Date: {data.date}</p>
          <p className="text-sm text-gray-500">Due: {data.dueDate}</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold text-gray-800">{data.companyName}</h2>
          <p className="text-sm text-gray-500">Billing to:</p>
          <p className="text-sm text-gray-700">{data.billTo}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-t border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Unit Price</th>
              <th className="py-2 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item: InvoiceItem, idx: number) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">${item.unitPrice.toFixed(2)}</td>
                <td className="py-2 px-4 text-right">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-8 flex justify-end">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Tax ({(data.taxRate * 100).toFixed(0)}%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-300 font-bold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
