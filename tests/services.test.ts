describe("service helper tests", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env.EXPO_PUBLIC_BASE_URL = "https://example.com";
    process.env.EXPO_PUBLIC_CLOUDINARY_URL = "https://cloud.example.com/";
    process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_NAME = "preset-test";
  });

  afterEach(() => {
    delete process.env.EXPO_PUBLIC_BASE_URL;
    delete process.env.EXPO_PUBLIC_CLOUDINARY_URL;
    delete process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_NAME;
  });

  it("returns true for connected internet states", async () => {
    const mockNetInfoFetch = jest.fn().mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
    });

    jest.doMock("@react-native-community/netinfo", () => ({
      __esModule: true,
      default: {
        fetch: mockNetInfoFetch,
      },
    }));

    const { checkInternet } = require("../service/checkInternet");

    await expect(checkInternet()).resolves.toBe(true);
  });

  it("returns false when the network is unreachable", async () => {
    const mockNetInfoFetch = jest.fn().mockResolvedValue({
      isConnected: false,
      isInternetReachable: false,
    });

    jest.doMock("@react-native-community/netinfo", () => ({
      __esModule: true,
      default: {
        fetch: mockNetInfoFetch,
      },
    }));

    const { checkInternet } = require("../service/checkInternet");

    await expect(checkInternet()).resolves.toBe(false);
  });

  it("returns true when the api health endpoint responds successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as typeof fetch;

    const { getApiHealth } = require("../service/apiHealthCheck");

    await expect(getApiHealth()).resolves.toBe(true);
  });

  it("returns false when the api health endpoint is unhealthy", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false }) as typeof fetch;

    const { getApiHealth } = require("../service/apiHealthCheck");

    await expect(getApiHealth()).resolves.toBe(false);
  });

  it("uploads a photo and returns the secure public URL", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ secure_url: "https://cdn.example.com/photo.jpg" }),
    }) as typeof fetch;

    const { uploadImage } = require("../service/imageUploadApi");

    await expect(uploadImage("file:///tmp/photo.jpg")).resolves.toBe(
      "https://cdn.example.com/photo.jpg",
    );
  });

  it("returns undefined when the Cloudinary preset is missing", async () => {
    delete process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_NAME;

    const { uploadImage } = require("../service/imageUploadApi");

    await expect(uploadImage("file:///tmp/photo.jpg")).resolves.toBeUndefined();
  });
});
