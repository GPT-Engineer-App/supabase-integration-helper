const Footer = () => {
  return (
    <footer className="bg-background p-4 text-center text-sm md:text-base text-muted-foreground">
      © {new Date().getFullYear()} My PWA App. All rights reserved.
    </footer>
  );
};

export default Footer;