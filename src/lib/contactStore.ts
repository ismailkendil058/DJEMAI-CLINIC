import { useState, useEffect } from "react";
import { MapPin, Phone, Smartphone, Printer, Mail } from "lucide-react";

export type IconType = "MapPin" | "Phone" | "Smartphone" | "Printer" | "Mail";

export const iconMap = {
  MapPin,
  Phone,
  Smartphone,
  Printer,
  Mail,
};

export interface ContactItem {
  id: string;
  iconType: IconType;
  lines: string[];
}

export interface ContactData {
  items: ContactItem[];
  callNowNumber: string;
  whatsappNumber: string;
  facebookUrl: string;
}

export const defaultContactData: ContactData = {
  items: [
    { id: "1", iconType: "MapPin", lines: ["Cité les Orangers, Rouiba – Alger"] },
    { id: "2", iconType: "Phone", lines: ["021 85 19 24", "021 85 19 47"] },
    { id: "3", iconType: "Smartphone", lines: ["07 71 18 05 81", "05 51 22 27 22"] },
    { id: "4", iconType: "Printer", lines: ["021 85 18 54"] },
    { id: "5", iconType: "Mail", lines: ["kinecentre@gmail.com"] },
  ],
  callNowNumber: "0771180581",
  whatsappNumber: "0771180581",
  facebookUrl: "https://www.facebook.com/",
};

const STORAGE_KEY = "djemai_clinic_contact_data";

export function getSavedContactData(): ContactData {
  if (typeof window === "undefined") {
    return defaultContactData;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContactData;
    const parsed = JSON.parse(raw);
    // basic structure validation to avoid corrupted localStorage breaking the app
    if (parsed && Array.isArray(parsed.items) && typeof parsed.callNowNumber === "string" && typeof parsed.whatsappNumber === "string" && typeof parsed.facebookUrl === "string") {
      return parsed;
    }
    return defaultContactData;
  } catch (error) {
    console.error("Error reading contact data from localStorage", error);
    return defaultContactData;
  }
}

export function saveContactData(data: ContactData): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch a custom event to notify other instances/components of changes
      window.dispatchEvent(new Event("contactDataChanged"));
    } catch (error) {
      console.error("Error saving contact data to localStorage", error);
    }
  }
}

export function useContactData() {
  const [data, setData] = useState<ContactData>(defaultContactData);

  useEffect(() => {
    // Load initially on client mount
    setData(getSavedContactData());

    // Listen to changes (e.g. from the admin page)
    const handleUpdate = () => {
      setData(getSavedContactData());
    };

    window.addEventListener("contactDataChanged", handleUpdate);
    return () => {
      window.removeEventListener("contactDataChanged", handleUpdate);
    };
  }, []);

  const updateData = (newData: ContactData) => {
    setData(newData);
    saveContactData(newData);
  };

  return {
    contactData: data,
    updateContactData: updateData,
  };
}
