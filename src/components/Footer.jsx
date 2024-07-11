const Footer = () => {
  return (
    <footer className="bg-background p-4 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} My PWA App. All rights reserved.
    </footer>
  );
};

export default Footer;