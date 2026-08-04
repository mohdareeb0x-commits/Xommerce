const mockGetAllCategories = jest.fn();
const mockGetProducts = jest.fn();
const mockGetProductById = jest.fn();
const mockDispatch = jest.fn();
const mockSelector = jest.fn();
const mockAlert = jest.fn();

jest.mock("react", () => ({
  useEffect: (callback: () => void) => callback(),
}));

jest.mock("react-native", () => ({
  Alert: {
    alert: mockAlert,
  },
}));

jest.mock("@/service/categroyApi", () => ({
  getAllCategories: (...args: unknown[]) => mockGetAllCategories(...args),
}));

jest.mock("@/service/productApi", () => ({
  GetProducts: (...args: unknown[]) => mockGetProducts(...args),
  GetProductById: (...args: unknown[]) => mockGetProductById(...args),
}));

jest.mock("@/service/apiHealthCheck", () => ({
  getApiHealth: jest.fn(),
}));

jest.mock("@/redux/apiHealthCheck/healthCheckSlice", () => ({
  changeApiState: jest.fn((value: boolean) => ({
    type: "health/state",
    payload: value,
  })),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    mockSelector(selector),
}));

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("hook tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch.mockClear();
    mockSelector.mockImplementation((selector) =>
      selector({ healthCheckReducer: { isApiUp: true } }),
    );
  });

  it("loads browse categories and products while toggling loading state", async () => {
    mockGetAllCategories.mockResolvedValue([{ id: "1", name: "Phones" }]);
    mockGetProducts.mockResolvedValue([[{ id: "p1" }], false]);

    const setProducts = jest.fn();
    const setError = jest.fn();
    const setCategories = jest.fn();
    const setIsLoading = jest.fn();
    const limitReached = { current: false };

    const useBrowseProducts = require("../hooks/useBrowseProducts").default;
    useBrowseProducts(
      setProducts,
      setError,
      setCategories,
      setIsLoading,
      1,
      10,
      limitReached,
      "",
      "",
      "",
      2,
      true,
      true,
      false,
    );

    await flushPromises();

    expect(mockGetAllCategories).toHaveBeenCalledTimes(1);
    expect(mockGetProducts).toHaveBeenCalledTimes(1);
    expect(setCategories).toHaveBeenCalledWith([{ id: "1", name: "Phones" }]);
    expect(setProducts).toHaveBeenCalledWith([{ id: "p1" }]);
    expect(setError).toHaveBeenCalledWith(false);
    expect(setIsLoading).toHaveBeenNthCalledWith(1, true);
    expect(setIsLoading).toHaveBeenNthCalledWith(2, false);
    expect(limitReached.current).toBe(false);
  });

  it("marks the browse limit as reached when the API reports no more pages", async () => {
    mockGetAllCategories.mockResolvedValue([]);
    mockGetProducts.mockResolvedValue([[{ id: "p2" }], true]);

    const setProducts = jest.fn();
    const setError = jest.fn();
    const setCategories = jest.fn();
    const setIsLoading = jest.fn();
    const limitReached = { current: false };

    const useBrowseProducts = require("../hooks/useBrowseProducts").default;
    useBrowseProducts(
      setProducts,
      setError,
      setCategories,
      setIsLoading,
      4,
      5,
      limitReached,
      "",
      "",
      "",
      1,
      true,
      true,
      false,
    );

    await flushPromises();

    expect(limitReached.current).toBe(true);
    expect(setProducts).toHaveBeenCalledWith([{ id: "p2" }]);
  });

  it("loads a product and refreshes category state on reload", async () => {
    mockGetProductById.mockResolvedValue({ id: "abc", name: "Test Product" });
    mockGetAllCategories.mockResolvedValue([{ id: "2", name: "Audio" }]);

    const setProduct = jest.fn();
    const setIsLoading = jest.fn();
    const setCategories = jest.fn();

    const useGetProductById = require("../hooks/useGetProductById").default;
    useGetProductById(setProduct, setIsLoading, setCategories, "abc", 1);

    await flushPromises();

    expect(mockGetProductById).toHaveBeenCalledWith("abc");
    expect(setProduct).toHaveBeenCalledWith({ id: "abc", name: "Test Product" });
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(mockGetAllCategories).toHaveBeenCalledTimes(1);
    expect(setCategories).toHaveBeenCalledWith([{ id: "2", name: "Audio" }]);
  });

  it("alerts when product fetch fails and still clears loading", async () => {
    mockGetProductById.mockRejectedValue(new Error("fail"));

    const setProduct = jest.fn();
    const setIsLoading = jest.fn();
    const setCategories = jest.fn();

    const useGetProductById = require("../hooks/useGetProductById").default;
    useGetProductById(setProduct, setIsLoading, setCategories, "abc", 1);

    await flushPromises();

    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(mockAlert).toHaveBeenCalledWith("Unable to fetch data");
  });

  it("reads the api state selector and dispatches a health update when the API responds", async () => {
    const { getApiHealth } = require("@/service/apiHealthCheck");
    getApiHealth.mockResolvedValue(false);

    const useHealth = require("../hooks/useHealth").default;
    const isApiUp = useHealth();

    await flushPromises();

    expect(isApiUp).toBe(true);
    expect(getApiHealth).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "health/state",
      payload: false,
    });
  });
});
