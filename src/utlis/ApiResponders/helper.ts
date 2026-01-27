const saveUser = (userData: Record<string, unknown>, token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("genz-user", JSON.stringify(userData));
  }
};

const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("genz-user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("genz-user");
  }
};

const getAdminUser = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("genz-admin-user");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

const removeAdminUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("genz-admin-user");
  }
};

const generatePassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

function stripAndTruncateHTML(html: string, maxLength: number = 100): string {
  const plainText = html
    .replace(/<[^>]*>/g, " ") // Remove HTML tags
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim(); // Remove leading/trailing spaces

  return plainText.length > maxLength
    ? plainText.slice(0, maxLength).trim() + "..."
    : plainText;
}

const convertDateTime = (dateStr: string, timeStr: string) => {
  const [hours, minutes] = timeStr.split(":");
  const [time, period] = minutes.split(" ");
  let hourIn24: number = parseInt(hours, 10);
  if (period === "PM" && hourIn24 !== 12) {
    hourIn24 += 12;
  } else if (period === "AM" && hourIn24 === 12) {
    hourIn24 = 0;
  }
  const dateTimeStr = `${dateStr} ${String(hourIn24).padStart(
    2,
    "0"
  )}:${time.padStart(2, "0")}:00`;
  return dateTimeStr;
};

const getExtensionFromBase64 = (base64String: string) => {
  const match = base64String.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
  if (!match) return "";

  const mimeType = match[1]; // e.g., image/webp
  const mimeMap: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "image/heic": "heic",
    "image/heif": "heif",
    "image/webp": "webp",
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
  };

  return mimeMap[mimeType] || "";
};

const calculatePercentageDifference = (
  previousValue: number | string,
  currentValue: number | string
): { percentage: number; isIncrease: boolean } => {
  const prev =
    typeof previousValue === "string"
      ? parseFloat(previousValue)
      : previousValue;
  const current =
    typeof currentValue === "string" ? parseFloat(currentValue) : currentValue;

  // Handle edge cases
  if (prev === 0 && current === 0) return { percentage: 0, isIncrease: false };
  if (prev === 0) return { percentage: 100, isIncrease: true };
  if (current === 0) return { percentage: 100, isIncrease: false };

  const difference = current - prev;
  const percentage = Math.abs((difference / prev) * 100);
  const isIncrease = difference > 0;

  return { percentage: Math.round(percentage), isIncrease };
};

const formatNumber = (num: number | string): string => {
  const value = typeof num === "string" ? parseFloat(num) : num;

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value.toString();
};

const Helper = {
  saveUser,
  getUser,
  removeUser,
  generatePassword,
  convertDateTime,
  getExtensionFromBase64,
  calculatePercentageDifference,
  formatNumber,
  stripAndTruncateHTML,
  getAdminUser,
  removeAdminUser,
};

export default Helper;
export { Helper };
export { saveUser, getAdminUser };
