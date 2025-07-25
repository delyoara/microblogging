
export const getAdminDashboard = (req, res) => {
  res.json({ message: "Bienvenue dans le dashboard admin ", user: req.user });
};