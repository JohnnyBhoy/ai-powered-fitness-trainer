export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  billTo: string;
  companyName: string;
  items: InvoiceItem[];
  taxRate: number; // e.g., 0.1 for 10%
}
