"use client";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import UsersTable from "../tables/users-table";
import styles2 from "@/app/styles/tables-scroll.module.css";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_ORDER_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_ALL_CLIENTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { methodsArray, paidStatusArray, sameTextField, taxArray } from "@/app/utils/base";

export default function AddOrderForm({ onAdded, sorts }: any) {
  const getProductInfo = (id: string) => {
    console.log(id);
    console.log(sorts);
    return sorts.find((e: any) => e.id === id);
  };

  const [data, setData] = useState([]);
  const { openPopup, popupState } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  //* =================
  const [formData, setFormData] = useState<{
    payment_method: string;
    paid_status: string;
    tax: string | null;
    discount: string;
  }>({
    payment_method: "",
    paid_status: "",
    tax: null,
    discount: "",
  });
  const handleFormData = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };
  const [openDropDown, setOpenDropDown] = useState({
    payment_method: false,
    paid_status: false,
    tax: false,
  });
  const handleOpenDropDown = (key: keyof typeof openDropDown, value: boolean) => {
    setOpenDropDown({ ...openDropDown, [key]: value });
  };
  const DropDownOptions = (arr: any, formDataKeyName: keyof typeof formData) => {
    return arr.map((e: any) => (
      <li
        key={e.value}
        onClick={() => {
          handleFormData(formDataKeyName, e.value);
          if (formDataKeyName !== "discount") {
            handleOpenDropDown(formDataKeyName, false);
          }
        }}
        className="p-mainxs text-center border-b border-myLight cursor-pointer"
      >
        {e.label}
      </li>
    ));
  };
  const getSlug = (arr: any, value: string) => {
    return arr.find((e: any) => e.value === value)?.label;
  };
  //* =================
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_CLIENTS_REQ);
    if (response.done) {
      setData(response.data.clients);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const totalPrice = popupState.makeOrderPopup.data.product_sorts.reduce(
    (acc: number, curr: { price: number; qty: number }) => acc + Number(curr.price) * curr.qty,
    0
  );
  const totalPriceAfter =
    totalPrice *
      (formData.tax && formData.tax !== "" ? Number(formData.tax.slice(0, 2)) / 100 + 1 : 1) -
    (formData.discount === "" ? 0 : Number(formData.discount));

  const validation = () => {
    if (!popupState.makeOrderPopup.data.client) {
      openSnakeBar("يجب اختيار عميل للمتابعة.");
      return false;
    }
    if (formData.payment_method === "") {
      openSnakeBar("يجب تحديد وسيلة دفع للمتابعة.");
      return false;
    }
    if (formData.paid_status === "") {
      openSnakeBar("يجب تحديد حالة الدفع للمتابعة.");
      return false;
    }
    if (Number(formData.discount) < 0) {
      openSnakeBar("لا يمكن ان يكون الخصم بالسالب.");
      return false;
    }
    if (
      Number(formData.discount) >
      totalPrice *
        (formData.tax && formData.tax !== "" ? Number(formData.tax.slice(0, 2)) / 100 + 1 : 1)
    ) {
      openSnakeBar("لا يمكن ان يكون الخصم اكبر من اجمالي السعر.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    console.log(validation());
    if (!validation()) return;
    const finalObj: any = {
      client_id: popupState.makeOrderPopup.data.client?.id,
      product_sorts: JSON.stringify(popupState.makeOrderPopup.data.product_sorts),
      ...formData,
    };
    if (finalObj.discount !== "") {
      finalObj.discount = +finalObj.discount;
    } else {
      delete finalObj.discount;
    }
    if (finalObj?.tax && finalObj?.tax !== "") {
      finalObj.tax = finalObj.tax.slice(0, 2);
    } else {
      delete finalObj.tax;
    }
    const response = await CLIENT_COLLECTOR_REQ(ADD_ORDER_REQ, {
      client_id: popupState.makeOrderPopup.data.client?.id,
      ...finalObj,
    });
    console.log(response);
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم انشاء الطلب بنجاح.", type: "success" });
      onAdded();
      const clientName = popupState.makeOrderPopup.data.client?.name ?? "غير معروف";
      const productSorts = popupState.makeOrderPopup.data.product_sorts
        .map((item: any, index: number) => {
          const sort = getProductInfo(item.product_id);
          return `<tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              sort?.product?.name && sort?.product?.name !== "" ? sort?.product?.name : "لا يوجد"
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              sort?.name && sort?.name !== "" ? sort?.name : "لا يوجد"
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              sort?.color && sort?.color !== "" ? sort?.color : "لا يوجد"
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              sort?.size && sort?.size !== "" ? sort?.size : "لا يوجد"
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sort?.product?.material}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sort?.qty}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${Number(
              sort?.price
            ).toLocaleString()}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${(
              sort?.qty * Number(getProductInfo(item.product_id)?.price)
            ).toLocaleString()}</td>
          </tr>`;
        })
        .join("");

      const printContent = `
      <html dir="rtl">
        <head>
          <title>فاتورة</title>
          <style>
            body { font-family: 'Cairo', sans-serif; margin: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            th { background-color: #f2f2f2; }
            .summary { margin-top: 20px; }
            .summary p { margin: 5px 0; }
            .print-button { background-color: #1976d2; }
              .print-button:hover { background-color: #1565c0; }
              .close-button { background-color: #d32f2f; }
              .close-button:hover { background-color: #b71c1c; }
          </style>
        </head>
        <body>
          <h2>تفاصيل الطلب</h2>
          <p><strong>اسم العميل:</strong> ${clientName}</p>
          <table>
            <thead>
              <tr>
                <th>*</th>
                <th>اسم المنتج</th>
                <th>اسم الصنف</th>
                <th>لون الصنف</th>
                <th>مقاس الصنف</th>
                <th>الخامة</th>
                <th>الكمية</th>
                <th>سعر الوحدة</th>
                <th>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              ${productSorts}
            </tbody>
          </table>
          <div class="summary">
            <p><strong>وسيلة الدفع:</strong> ${getSlug(methodsArray, formData.payment_method)}</p>
            <p><strong>حالة الدفع:</strong> ${getSlug(paidStatusArray, formData.paid_status)}</p>
            <p><strong>الضريبة:</strong> ${
              formData.tax ? getSlug(taxArray, formData.tax) : "لا يوجد"
            }</p>
            <p><strong>الخصم:</strong> ${
              formData.discount ? Number(formData.discount).toLocaleString() : "لا يوجد"
            }</p>
            <p><strong>إجمالي السعر:</strong> ${Number(totalPrice.toFixed(2)).toLocaleString()}</p>
            <p><strong>إجمالي السعر بعد الضريبة والخصم:</strong> ${Number(
              totalPriceAfter.toFixed(2)
            ).toLocaleString()}</p>
          </div>
          <div class="button-container">
              <button class="print-button" onclick="window.print()">طباعة</button>
              <button class="close-button" onclick="window.close()">إغلاق</button>
            </div>
        </body>
      </html>
    `;

      const printWindow = window.open("about:blank", "_new");
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
      } else {
        openSnakeBar("فشل فتح نافذة الطباعة. تأكد من السماح بفتح النوافذ المنبثقة.");
      }
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <div className="relative rounded-xl shadow-md min-w-[620px] bg-myLight p-mainxl flex flex-col items-center">
      <h2 className="text-lg text-center font-semibold mb-4">انشاء طلب جديد</h2>
      <div className={styles2.list + " max-h-[250px] overflow-y-scroll"}>
        <UsersTable type="client" forOrder={true} data={data} />
      </div>
      <div className="w-full flex gap-2 items-center mt-5">
        <SelectList
          placeHolder="حالة الدفع"
          select={
            formData.paid_status !== ""
              ? getSlug(paidStatusArray, formData.paid_status)
              : "حالة الدفع"
          }
          onClick={() => handleOpenDropDown("paid_status", true)}
          onBlur={() => handleOpenDropDown("paid_status", false)}
          dropDown={openDropDown.paid_status}
        >
          {openDropDown.paid_status && (
            <>
              <ul
                className={
                  styles.list +
                  " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                }
              >
                {DropDownOptions(paidStatusArray, "paid_status")}
              </ul>
            </>
          )}
        </SelectList>
        <SelectList
          placeHolder="وسيلة الدفع"
          select={
            formData.payment_method !== ""
              ? getSlug(methodsArray, formData.payment_method)
              : "وسيلة الدفع"
          }
          onClick={() => handleOpenDropDown("payment_method", true)}
          onBlur={() => handleOpenDropDown("payment_method", false)}
          dropDown={openDropDown.payment_method}
        >
          {openDropDown.payment_method && (
            <>
              <ul
                className={
                  styles.list +
                  " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                }
              >
                {DropDownOptions(methodsArray, "payment_method")}
              </ul>
            </>
          )}
        </SelectList>
      </div>
      <div className="w-full flex gap-2 items-center mt-5">
        <TextField
          id="Glu"
          dir="rtl"
          label="الخصم بالجنية"
          variant="filled"
          type="number"
          sx={sameTextField}
          value={formData.discount}
          onChange={(e) => handleFormData("discount", e.target.value)}
          className="w-full"
        />
        <SelectList
          placeHolder="ضريبة القيمة المضافة"
          select={getSlug(taxArray, formData.tax as string) ?? "ضريبة القيمة المضافة"}
          onClick={() => handleOpenDropDown("tax", true)}
          onBlur={() => handleOpenDropDown("tax", false)}
          dropDown={openDropDown.tax}
        >
          {openDropDown.tax && (
            <>
              <ul
                className={
                  styles.list +
                  " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                }
              >
                {DropDownOptions(taxArray, "tax")}
              </ul>
            </>
          )}
        </SelectList>
      </div>
      <div className="w-full flex gap-2 items-center mt-5">
        <TextField
          id="Glu"
          dir="rtl"
          label="اجمالي السعر بعد الضريبة والخصم"
          variant="filled"
          sx={sameTextField}
          value={Number(totalPriceAfter.toFixed(2)).toLocaleString()}
          className="w-full"
          disabled
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="اجمالي السعر"
          variant="filled"
          sx={sameTextField}
          value={Number(totalPrice.toFixed(2)).toLocaleString()}
          className="w-full"
          disabled
        />
      </div>
      <Button
        onClick={handleDone}
        sx={{ fontFamily: "cairo" }}
        className="!bg-mdDark !mt-3 w-fit"
        variant="contained"
      >
        تأكيد الطلب
      </Button>
    </div>
  );
}
