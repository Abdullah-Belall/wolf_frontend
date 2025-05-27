import OrderBillsTable from "../tables/order-bills-table";

export default function OrderPrint() {
  return (
    <div className="mx-auto flex flex-col items-center max-w-xl justify-center w-full px-mainxs">
      <h1 className="font-bold">فاتورة مبيعات</h1>
      <div dir="rtl" className="flex flex-col w-full mt-3">
        <h2>العميل: قطاعي</h2>
        <h2>ضريبة القيمة المضافة: 14</h2>
        <h2>الخصم: 10</h2>
        <h2>اجمالي السعر: 2321</h2>
      </div>
      <OrderBillsTable data={data} />
    </div>
  );
}

const data = [
  {
    name: "ديمرا ضد القطع",
    color: null,
    size: "L",
    qty: 15,
    price: 550,
    created_at: new Date(),
    note: null,
    product: {
      name: "جوانتي",
      material: "جلد",
    },
  },
  {
    name: "ديمرا ضد القطع",
    color: null,
    size: "L",
    qty: 15,
    price: 550,
    created_at: new Date(),
    note: null,
    product: {
      name: "جوانتي",
      material: "جلد",
    },
  },
  {
    name: "ديمرا ضد القطع",
    color: null,
    size: "L",
    qty: 15,
    price: 550,
    created_at: new Date(),
    note: null,
    product: {
      name: "جوانتي",
      material: "جلد",
    },
  },
  {
    name: "ديمرا ضد القطع",
    color: null,
    size: "L",
    qty: 15,
    price: 550,
    created_at: new Date(),
    note: null,
    product: {
      name: "جوانتي",
      material: "جلد",
    },
  },
];
