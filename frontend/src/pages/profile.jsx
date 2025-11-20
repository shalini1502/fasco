// src/pages/Profile.jsx
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { auth, API_BASE, authHeaders, logout, setAuth } =
    useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(auth?.user || null);
  const [name, setName] = useState(auth?.user?.name || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!auth?.token) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/user/profile`, {
          method: "GET",
          headers: authHeaders(),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          toast.error(err.message || "Failed to fetch profile");
          logout();
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setName(data.user.name || "");
        setEmail(data.user.email || "");
      } catch (err) {
        toast.error("Network error fetching profile", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [auth?.token]); // eslint-disable-line

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: name.trim(), email: email.trim() };
      if (password.trim()) payload.password = password.trim();

      const res = await fetch(`${API_BASE}/api/user/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Profile updated");
      const newAuth = {
        token: data.token || auth.token,
        user: data.user || {
          ...auth.user,
          name: payload.name,
          email: payload.email,
        },
      };

      setAuth(newAuth);
      setUser(newAuth.user);
      setPassword("");
    } catch (err) {
      toast.error(err.message || "Update error");
    } finally {
      setSaving(false);
    }
  };

  if (!auth?.token) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Please login to view profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {user?.name || "Your Name"}
          </h2>
          <p className="text-sm text-gray-600">
            {user?.email || "email@example.com"}
          </p>
        </div>
      </div>

      <form onSubmit={onSave} className="bg-white p-6 rounded shadow-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuth(null);
              logout();
            }}
            className="px-4 py-2 border rounded"
          >
            Log out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
