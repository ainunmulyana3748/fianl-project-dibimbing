import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useUpdateRole from "@/hooks/User/useUpdateRole";

const fallbackImage =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d";

export default function UpdateUserRoleModal({ open, onClose, user, onSubmit }) {
  const [role, setRole] = useState(user?.role ?? "user");
  const { updateRole } = useUpdateRole();

  const handleSave = async () => {
    try {
      await updateRole(user.id, role);
      onSubmit({ ...user, role });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-orange-100 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-600">
            Update User Role
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Change the role of this user to{" "}
            <span className="font-medium">admin</span> or{" "}
            <span className="font-medium">user</span>.
          </DialogDescription>
        </DialogHeader>

        {/* User Info */}
        <div className="flex items-center gap-3 mt-4 mb-6">
          <img
            src={user?.profilePictureUrl || fallbackImage}
            alt={user?.name}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role
          </label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
