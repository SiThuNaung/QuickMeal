export default function UserForm({ userData, setUserData }) {
    return (
      <div className="user-form p-4 bg-gray-100 rounded-md mb-6">
        <h2 className="text-lg font-bold mb-4">User Information</h2>
  
        <input
          type="text"
          placeholder="Your Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Your Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
    );
  }
  