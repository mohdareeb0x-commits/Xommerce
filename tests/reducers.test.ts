import categoryReducer, {
    setCategoryMap,
} from "../redux/category/categorySlice";
import chipCategoryReducer, {
    toggle,
    toggleSeeAll,
} from "../redux/chipCattegory/chipCattegorySlice";
import filterReducer, {
    setApply,
    setCategory,
    setError,
    setMaxPrice,
    setMinPrice,
    toggleApply,
} from "../redux/filter/filterSlice";
import signinReducer, {
    resetSignIn,
    setEmail as setSigninEmail,
    setPassword as setSigninPassword,
} from "../redux/signIn/signinSlice";
import signupReducer, {
    resetSignUp,
    setEmail as setSignupEmail,
    setPassword as setSignupPassword,
    setUsername,
} from "../redux/signup/signupSlice";

describe("redux slice reducers", () => {
  it("initializes the category slice with an empty category map", () => {
    expect(categoryReducer(undefined, { type: "unknown" })).toEqual({
      categoryMap: {},
    });
  });

  it("updates the category map via the category reducer action", () => {
    const nextState = categoryReducer(
      undefined,
      setCategoryMap({ Laptops: "laptops", Phones: "phones" }),
    );

    expect(nextState.categoryMap).toEqual({
      Laptops: "laptops",
      Phones: "phones",
    });
  });

  it("toggles the chip category value and all-mode flag", () => {
    const firstState = chipCategoryReducer(undefined, toggle("Phones"));
    const secondState = chipCategoryReducer(firstState, toggleSeeAll(true));

    expect(firstState.value).toBe("Phones");
    expect(secondState.value).toBe("Phones");
    expect(secondState.seeAll).toBe(true);
  });

  it("tracks the filter state and applied version changes", () => {
    let state = filterReducer(undefined, { type: "unknown" });

    state = filterReducer(state, setMinPrice("10"));
    state = filterReducer(state, setMaxPrice("100"));
    state = filterReducer(state, setCategory("Audio"));
    state = filterReducer(state, setApply(true));
    state = filterReducer(state, setError(true));
    state = filterReducer(state, toggleApply());

    expect(state.minPrice).toBe("10");
    expect(state.maxPrice).toBe("100");
    expect(state.category).toBe("Audio");
    expect(state.applied).toBe(true);
    expect(state.error).toBe(true);
    expect(state.appliedVersion).toBe(1);
  });

  it("resets the sign-in form state cleanly", () => {
    let state = signinReducer(undefined, { type: "unknown" });

    state = signinReducer(state, setSigninEmail("user@example.com"));
    state = signinReducer(state, setSigninPassword("secret"));
    state = signinReducer(state, resetSignIn());

    expect(state).toEqual({ email: "", password: "" });
  });

  it("resets the sign-up form state cleanly", () => {
    let state = signupReducer(undefined, { type: "unknown" });

    state = signupReducer(state, setSignupEmail("user@example.com"));
    state = signupReducer(state, setUsername("test-user"));
    state = signupReducer(state, setSignupPassword("secret"));
    state = signupReducer(state, resetSignUp());

    expect(state).toEqual({
      email: "",
      username: "",
      password: "",
    });
  });
});
