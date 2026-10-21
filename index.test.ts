import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createStore } from './index.ts'


describe("the redux mini", () => {

    it("should have createStore function", () => {
        assert(typeof(createStore) === "function")
    })

});

describe("the createStore", () => {
    it("it should accept single argument", () => {
        assert(createStore.length === 1)
    })

    it("it should return 3 functions in an object", () => {
        const store = createStore({});
        const getState = store["getState"]
        const updateState = store["updateState"]
        const addListener = store["addListener"]
        assert(typeof(getState) === "function" && typeof(updateState) === "function" && typeof(addListener) === "function")
    })

    it("it should make deep clone of initial passed state", () => {
        const initState = {
            user: {name: "john"}
        };
        const store = createStore(initState);

        initState.user.name = "doe"

        const state = store.getState();
        assert(state.user.name !== initState.user.name)
    })
})