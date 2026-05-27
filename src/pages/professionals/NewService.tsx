import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Star, Briefcase } from "lucide-react";

const NewService = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------- FORM STATE ----------
  const [form, setForm] = useState({
    name: "",
    surname: "",
    currentJobTitle: "",
    companyName: "",
    companyDescription: "",
    industry: "",
    description: "",
    tags: [],
    rate: "",
    image: "",
    socials: {
      linkedin: "",
      twitter: "",
      website: "",
    },
    experience: [],
    availability: [],
    skills: [],
    price: "",
  });

  const [newTag, setNewTag] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newAvailability, setNewAvailability] = useState("");
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    duration: "",
    companyLogo: "",
  });

  const tagColors = [
  "bg-purple-100 text-purple-800",
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-red-100 text-red-800",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-800",
  "bg-indigo-100 text-indigo-800",
];


  // ---------- LOAD DUMMY DATA ----------
  useEffect(() => {
    const dummy = {
      name: "Thabo",
      surname: "Mokoena",
      currentJobTitle: "Senior Backend Engineer",
      companyName: "Amazon Web Services",
      description:
        "I help students master backend development, technical interviews, and real-world system design.",
      price: 180,
      image: "https://i.pravatar.cc/150?img=12",
      tags: ["Node.js", "System Design", "Backend"],
      rating: 4.9,
    };

    // ❗ Change to `null` if you want the form to show instead
    setProfile(dummy);
    setLoading(false);
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile Saved!");
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <section className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Mentor Service Profile
      </h2>

      {/* ===============================
          IF A PROFILE EXISTS (DUMMY)
         =============================== */}
      {profile ? (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

          {/* TOP SECTION */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={profile.image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
            />

            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {profile.name} {profile.surname}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {profile.currentJobTitle} @ {profile.companyName}
              </p>

              <div className="flex items-center gap-1 mt-1 text-yellow-500">
                <Star size={18} />
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {profile.rating}
                </span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            {profile.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.tags.map((tag, i) => (
                <span
                key={i}
                className={`${tagColors[i % tagColors.length]} px-3 py-1 rounded-full text-sm`}
                >
                {tag}
                </span>
            ))}
            </div>


          {/* PRICE */}
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Briefcase size={20} />
              <span>R{profile.price} per interview</span>
            </div>

            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
              <Pencil size={16} /> Edit Profile
            </button>
          </div>
        </div>
      ) : (
        /* ===============================
            FORM TO CREATE A NEW SERVICE
           =============================== */
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Create Your Mentor Service
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-6">

            {/* AVATAR UPLOAD */}
            <div>
              <label className="block font-medium mb-2 text-gray-800 dark:text-gray-200">
                Profile Avatar
              </label>

              <div className="flex items-center gap-4">
                <img
                  src={form.image || "https://via.placeholder.com/120?text=Avatar"}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-slate-600"
                />

                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Paste image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="input"
                  />

                  <label className="cursor-pointer px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const preview = URL.createObjectURL(file);
                          setForm({ ...form, image: preview });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Surname"
                className="input"
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
              />

              <input
                type="text"
                placeholder="Current Job Title"
                className="input"
                value={form.currentJobTitle}
                onChange={(e) =>
                  setForm({ ...form, currentJobTitle: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Company Name"
                className="input"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
              />
            </div>

            {/* DESCRIPTION */}
            <textarea
              className="input h-32"
              placeholder="Describe your background, expertise…"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {/* TAGS */}
            <div>
              <label className="block font-medium mb-2">Expertise Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTag.trim()) {
                      setForm({ ...form, tags: [...form.tags, newTag] });
                      setNewTag("");
                    }
                  }}
                  className="btn-primary"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {form.tags.map((tag, i) => (
                    <span
                    key={i}
                    className={`${tagColors[i % tagColors.length]} px-3 py-1 rounded-full text-sm flex items-center gap-2`}
                    >
                    {tag}
                    <Trash2
                        size={14}
                        className="cursor-pointer"
                        onClick={() =>
                        setForm({
                            ...form,
                            tags: form.tags.filter((t) => t !== tag),
                        })
                        }
                    />
                    </span>
                ))}
                </div>


            </div>

            {/* PRICE */}
            <input
              type="number"
              placeholder="Price per interview (ZAR)"
              className="input"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save Service Profile
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default NewService;
