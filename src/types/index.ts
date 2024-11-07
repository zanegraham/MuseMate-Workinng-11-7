export interface BandMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  equipment?: string[];
  availability?: {
    preferred: string[];
    unavailable: string[];
  };
  notes?: string;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  description?: string;
  quantity: number;
  available: number;
  notes?: string;
  lastUsed?: string;
  location?: string;
  maintenanceStatus?: 'good' | 'needs-maintenance' | 'under-repair' | 'damaged';
  serialNumber?: string;
  purchaseDate?: string;
  purchasePrice?: string;
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  type: 'concert' | 'festival' | 'workshop' | 'party';
  venue?: string;
  expectedAttendees?: number;
  checklist: {
    itemId: string;
    completed: boolean;
  }[];
  notes?: string;
  details?: {
    venueContact?: string;
    contactPhone?: string;
    loadInTime?: string;
    soundCheck?: string;
    showStart?: string;
    timeline?: Record<string, string>;
    ticketing?: {
      provider?: string;
      url?: string;
      price?: number;
      capacity?: number;
      soldCount?: number;
    };
  };
  members?: BandMember[];
  merchandise?: MerchandiseItem[];
  equipment?: EquipmentRental[];
}

export interface MerchandiseItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  variants?: {
    size?: string;
    color?: string;
    quantity: number;
  }[];
  status: 'draft' | 'ordered' | 'received';
  orderDetails?: {
    orderId?: string;
    orderDate?: string;
    expectedDelivery?: string;
  };
}

export interface EquipmentRental {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  pickupDate: Date;
  returnDate: Date;
  delivery: boolean;
  deliveryAddress?: string;
  supplier: {
    name: string;
    contact: string;
    phone?: string;
  };
  status: 'pending' | 'confirmed' | 'picked-up' | 'returned';
  cost: number;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  type: Event['type'];
  categories: string[];
  items: string[];
}