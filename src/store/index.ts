import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Item, Event, ChecklistTemplate, BandMember } from '../types';

interface Store {
  items: Item[];
  events: Event[];
  templates: ChecklistTemplate[];
  loading: boolean;
  error: string | null;
  userId: string | null;
  
  setUserId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Items
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  
  // Events
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  
  // Band Members
  addMember: (eventId: string, member: Omit<BandMember, 'id'>) => void;
  updateMember: (eventId: string, member: BandMember) => void;
  deleteMember: (eventId: string, memberId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      items: [],
      events: [],
      templates: [],
      loading: false,
      error: null,
      userId: null,

      setUserId: (id) => set({ userId: id }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      addItem: (item) => {
        const newItem = {
          ...item,
          id: Date.now().toString(),
        };
        set(state => ({ items: [...state.items, newItem] }));
      },

      updateItem: (id, updates) => {
        set(state => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },

      deleteItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        }));
      },

      addEvent: (event) => {
        const newEvent = {
          ...event,
          id: Date.now().toString(),
          checklist: event.checklist || [],
          members: event.members || [],
          merchandise: event.merchandise || [],
          equipment: event.equipment || [],
        };
        
        set(state => ({ 
          events: [...state.events, newEvent],
        }));
      },

      updateEvent: (event) => {
        set(state => ({
          events: state.events.map(e => e.id === event.id ? event : e),
        }));
      },

      deleteEvent: (id) => {
        set(state => ({
          events: state.events.filter(event => event.id !== id),
        }));
      },

      addMember: (eventId, member) => {
        const newMember = {
          ...member,
          id: Date.now().toString(),
        };
        set(state => ({
          events: state.events.map(event => 
            event.id === eventId
              ? {
                  ...event,
                  members: [...(event.members || []), newMember],
                }
              : event
          ),
        }));
      },

      updateMember: (eventId, member) => {
        set(state => ({
          events: state.events.map(event => 
            event.id === eventId
              ? {
                  ...event,
                  members: event.members?.map(m => 
                    m.id === member.id ? member : m
                  ),
                }
              : event
          ),
        }));
      },

      deleteMember: (eventId, memberId) => {
        set(state => ({
          events: state.events.map(event => 
            event.id === eventId
              ? {
                  ...event,
                  members: event.members?.filter(m => m.id !== memberId),
                }
              : event
          ),
        }));
      },
    }),
    {
      name: 'musemate-storage',
      partialize: (state) => ({
        items: state.items,
        events: state.events,
        userId: state.userId,
      }),
    }
  )
);