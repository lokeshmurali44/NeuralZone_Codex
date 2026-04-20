import "./globals.css";

export const metadata = {
  title: "NEURALZOME | Autonomous Field Robotics",
  description:
    "A cinematic product-led website concept for Neuralzome, an agricultural autonomy platform for rugged autonomous mowing and weeding machines.",
  metadataBase: new URL("https://neuralzome.com")
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
