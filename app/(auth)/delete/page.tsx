"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteMonoCustomer } from "@/lib/mono.action"; // Direct import instead of using deleteUser
import CustomerIDForm from "@/components/customerIdForm";

interface DeleteCustomerProps {
  monoCustomerId?: string; // Make this the only required ID
  onSuccess?: () => void;
}

const DeleteCustomer: React.FC<DeleteCustomerProps> = ({
  monoCustomerId,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showIdForm, setShowIdForm] = useState(false);
  const [customerId, setCustomerId] = useState(monoCustomerId || "");

  const handleDelete = async () => {
    if (!customerId) {
      setError("Customer ID is required");
      setShowIdForm(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Call deleteMonoCustomer directly instead of deleteUser
      await deleteMonoCustomer(customerId);
      setShowConfirm(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete customer");
    } finally {
      setIsLoading(false);
    }
  };

  if (showIdForm) {
    return (
      <CustomerIDForm
        onSuccess={onSuccess}
        onIdSubmit={(id) => {
          setCustomerId(id);
          setShowIdForm(false);
          setShowConfirm(true);
        }}
      />
    );
  }

  return (
    <div>
      {!showConfirm ? (
        <Button
          variant="destructive"
          onClick={() => {
            if (!customerId) {
              setShowIdForm(true);
            } else {
              setShowConfirm(true);
            }
          }}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete Customer
        </Button>
      ) : (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-700 mb-3">
            Are you sure you want to delete this customer? This action cannot be undone.
          </p>
          
          {customerId && (
            <p className="text-sm mb-3">
              Customer ID: <span className="font-mono">{customerId}</span>
            </p>
          )}
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Confirm Delete
                </>
              )}
            </Button>
          </div>
          
          {error && (
            <p className="mt-3 text-red-700 text-sm">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteCustomer;