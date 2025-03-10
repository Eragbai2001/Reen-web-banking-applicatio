"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Search, UserX } from "lucide-react";
import { deleteMonoCustomer } from "@/lib/mono.action"; // Direct import instead

interface CustomerIDFormProps {
  onSuccess?: () => void;
  onIdSubmit?: (monoCustomerId: string) => void;
}

const CustomerIDForm: React.FC<CustomerIDFormProps> = ({
  onSuccess,
  onIdSubmit,
}) => {
  const [monoCustomerId, setMonoCustomerId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);

  const handleVerifyId = async () => {
    if (!monoCustomerId.trim()) {
      setError("Please enter a valid customer ID");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      // You can add an API call here to verify if the ID exists
      // For now, we'll just do basic validation
      if (monoCustomerId.trim().length < 5) {
        throw new Error(
          "ID format appears invalid. Please check and try again."
        );
      }

      setIsIdVerified(true);
      if (onIdSubmit) {
        onIdSubmit(monoCustomerId);
      }
    } catch (err) {
      setError((err as Error).message || "Failed to verify customer ID");
      setIsIdVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDelete = async () => {
    if (!isIdVerified) {
      setError("Please verify the customer ID first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await deleteMonoCustomer(monoCustomerId);
      setShowConfirm(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to delete customer");
      } else {
        setError("Failed to delete customer");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Customer Deletion</CardTitle>
        <CardDescription>
          Enter the Mono customer ID to delete the associated account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="customerId" className="text-sm font-medium">
              Mono Customer ID
            </label>
            <div className="flex gap-2">
              <Input
                id="customerId"
                value={monoCustomerId}
                onChange={(e) => setMonoCustomerId(e.target.value)}
                placeholder="Enter customer ID"
                disabled={isIdVerified || isVerifying}
                className="flex-1"
              />
              {!isIdVerified ? (
                <Button
                  onClick={handleVerifyId}
                  disabled={isVerifying || !monoCustomerId.trim()}
                  className="flex items-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Verify
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsIdVerified(false);
                    setShowConfirm(false);
                  }}
                >
                  Change
                </Button>
              )}
            </div>
            {isIdVerified && (
              <p className="text-sm text-green-600">ID verified ✓</p>
            )}
          </div>

          {isIdVerified && !showConfirm && (
            <Button
              variant="destructive"
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 w-full"
            >
              <UserX size={16} />
              Delete Customer Account
            </Button>
          )}

          {showConfirm && (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <p className="text-red-700 mb-3">
                Are you sure you want to delete this customer? This action
                cannot be undone.
              </p>

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
                      <UserX size={16} />
                      Confirm Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </CardFooter>
    </Card>
  );
};

export default CustomerIDForm;
