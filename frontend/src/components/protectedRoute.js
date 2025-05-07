import ProtectedRoute from "./components/ProtectedRoute";

<Routes>
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>
