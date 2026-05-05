"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "./supabase";
import { Property } from "./types";
import { properties as staticProperties } from "@/data/properties";
import { generatePropertyNumber } from "./propertyNumber";

interface PropertiesContextType {
  properties: Property[];
  loading: boolean;
  refresh: () => Promise<void>;
  addProperty: (p: Omit<Property, "id">) => Promise<boolean>;
  updateProperty: (p: Property) => Promise<boolean>;
  deleteProperty: (id: string) => Promise<boolean>;
  isSupabaseConnected: boolean;
}

const PropertiesContext = createContext<PropertiesContextType>({
  properties: staticProperties,
  loading: false,
  refresh: async () => {},
  addProperty: async () => false,
  updateProperty: async () => false,
  deleteProperty: async () => false,
  isSupabaseConnected: false,
});

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(staticProperties);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        // Determine if we should show demo properties
        // Hide demo when we have 10+ real properties
        const realProperties = data.filter(p => !p.is_demo);
        const shouldHideDemo = realProperties.length >= 10;

        if (data.length > 0) {
          // Use real properties, don't mix with demo
          setProperties(data);
          setIsSupabaseConnected(true);
        } else if (!shouldHideDemo) {
          // Few or no real properties, show demo as placeholder
          setProperties(staticProperties);
          setIsSupabaseConnected(false);
        } else {
          // We have enough real properties, hide demo completely
          setProperties(data);
          setIsSupabaseConnected(true);
        }
      } else {
        // Query error, use demo properties
        setProperties(staticProperties);
        setIsSupabaseConnected(false);
      }
    } catch {
      // Connection error, use demo properties
      setProperties(staticProperties);
      setIsSupabaseConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addProperty = async (p: Omit<Property, "id">): Promise<boolean> => {
    try {
      const propertyData = {
        ...p,
        property_number: p.property_number || generatePropertyNumber(),
      };
      const { data, error } = await supabase
        .from("properties")
        .insert(propertyData)
        .select()
        .single();

      if (error) throw error;
      setProperties((prev) => [data, ...prev]);
      return true;
    } catch {
      // Fallback: add locally
      const newProp = {
        ...p,
        id: Date.now().toString(),
        property_number: p.property_number || generatePropertyNumber(),
      } as Property;
      setProperties((prev) => [newProp, ...prev]);
      return true;
    }
  };

  const updateProperty = async (p: Property): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("properties")
        .update(p)
        .eq("id", p.id);

      if (error) throw error;
      setProperties((prev) => prev.map((x) => (x.id === p.id ? p : x)));
      return true;
    } catch {
      setProperties((prev) => prev.map((x) => (x.id === p.id ? p : x)));
      return true;
    }
  };

  const deleteProperty = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
      setProperties((prev) => prev.filter((x) => x.id !== id));
      return true;
    } catch {
      setProperties((prev) => prev.filter((x) => x.id !== id));
      return true;
    }
  };

  return (
    <PropertiesContext.Provider
      value={{ properties, loading, refresh, addProperty, updateProperty, deleteProperty, isSupabaseConnected }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export const useProperties = () => useContext(PropertiesContext);
