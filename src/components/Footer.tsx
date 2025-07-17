export default function Footer() {
  return (
    <footer
      className="text-white z-40 flex items-center justify-center"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: '#4a5568', // Dark gray-blue background
        height: '80px', // Explicit height for the footer
      }}
    >
      <p className="text-sm">© 2025 clinicalLabel.io. All rights reserved.</p>
    </footer>
  );
}
