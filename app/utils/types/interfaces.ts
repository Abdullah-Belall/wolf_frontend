export interface LoginInterface {
  user_name: string;
  password: string;
}
export interface AddCategoryInterface {
  name: string;
  desc?: string;
}

export interface CategoryInterface {
  id: string;
  name: string;
  desc: string;
  products_count: number;
  created_at: Date;
  updated_at: Date;
}
export interface ProductInterface {
  index: number;
  category: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  desc: string;
  qty: number;
  material: string;
  note: string | null;
  created_at: Date;
  updated_at?: Date;
  sorts_count: number;
}
export interface ProductItemInterface {
  id: string;
  index: number;
  name: string;
  color: string | null;
  size: string;
  qty: number;
  price: string;
  note: string | null;
  orders_count: number;
  created_at: Date;
  updated_at?: Date;
}

export interface AddSortInterface {
  id?: string;
  color?: string;
  size: string;
  qty: number;
  cost: number;
  price: number;
}
export interface PaymentInterface {
  id: string;
  payment_method: string;
  status: string;
  created_at?: Date;
}

export interface OrderInterface {
  id: string;
  total_price: string;
  created_at: Date;
  payment: PaymentInterface;
  tax: string;
  discount: number;
  client: {
    id: string;
    user_name: string;
  };
}
export interface OrderItemInterface {
  id: string;
  qty: number;
  unit_price: string;
  product: ProductItemInterface;
}

export interface SortInterface {
  id: string;
  name: string;
  color: string | null;
  size: string;
  qty: number;
  price: string;
  note: string;
  created_at: Date;
  updated_at?: Date;
  product: {
    id: string;
    name: string;
    material: string;
    category: {
      id: string;
      name: string;
    };
  };
}
export enum PaymentMethodsEnum {
  CASH = "cash",
  BANK_TRANSFER = "bank_transfer",
  VF_CASH = "vf_cash",
}
export enum PaidStatusEnum {
  PAID = "paid",
  PENDING = "pending",
}
export interface AddOrderInterface {
  client_id: string;
  product_sorts: JSON;
  payment_method: string;
  paid_status: string;
  discount?: string;
  tax?: number;
}
export interface AddProductInterface {
  name: string;
  desc: string | null;
  categoty_id: string;
  material: string;
  note: string | null;
}
export interface AddressInterface {
  id: string;
  governorate: string;
  city: string;
  street: string;
  more_info: string | null;
  is_main: boolean;
  address_for: string;
  created_at: Date;
  updated_at: Date;
}
export interface PhoneInterface {
  index?: number;
  id: string;
  phone: string;
  note: string | null;
  is_main: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface ClientInterface {
  id: string;
  user_name: string;
  tax_num: string;
  created_at: Date;
  updated_at: Date;
  role?: string;
  orders?: OrderInterface[];
  shipping_addresses?: AddressInterface[];
  contacts?: PhoneInterface[];
  orders_count?: number;
  contacts_count?: number;
  addresses_count?: number;
}
export interface WorkersInterface {
  id: string;
  user_name: string;
  role: string;
  is_banned: boolean;
  banned_reason: string;
  created_at: Date;
  updated_at: Date;
  contacts?: PhoneInterface[];
  contacts_count: number;
}

export interface AddClientContactInterface {
  phone: string;
  note: string | null;
  user_id: string;
}
