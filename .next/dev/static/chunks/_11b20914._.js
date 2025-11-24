(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/contexts/cart-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CartProvider({ children }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Cargar carrito del localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                try {
                    setItems(JSON.parse(savedCart));
                } catch (error) {
                    console.error("Error loading cart:", error);
                }
            }
            setIsLoaded(true);
        }
    }["CartProvider.useEffect"], []);
    // Guardar carrito en localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            if (isLoaded) {
                localStorage.setItem("cart", JSON.stringify(items));
            }
        }
    }["CartProvider.useEffect"], [
        items,
        isLoaded
    ]);
    const addItem = (item)=>{
        setItems((prevItems)=>{
            const existingItem = prevItems.find((i)=>i.id === item.id);
            if (existingItem) {
                return prevItems.map((i)=>i.id === item.id ? {
                        ...i,
                        quantity: i.quantity + (item.quantity || 1)
                    } : i);
            }
            return [
                ...prevItems,
                {
                    ...item,
                    quantity: item.quantity || 1
                }
            ];
        });
    };
    const removeItem = (id)=>{
        setItems((prevItems)=>prevItems.filter((item)=>item.id !== id));
    };
    const updateQuantity = (id, quantity)=>{
        if (quantity <= 0) {
            removeItem(id);
        } else {
            setItems((prevItems)=>prevItems.map((item)=>item.id === id ? {
                        ...item,
                        quantity
                    } : item));
        }
    };
    const clearCart = ()=>{
        setItems([]);
    };
    const total = items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            total
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/cart-context.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(CartProvider, "NiJRvaBpsoWpHMtjFD9yYYyCDaQ=");
_c = CartProvider;
function useCart() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://vlmmzuotlerjijxuuxdo.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbW16dW90bGVyamlqeHV1eGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjE0MjYsImV4cCI6MjA3OTIzNzQyNn0.YWSVwG5U5KkzR6bUVSKwDdfNRwcWFloxTJBg81Mcq_c");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/use-toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: 'ADD_TOAST',
    UPDATE_TOAST: 'UPDATE_TOAST',
    DISMISS_TOAST: 'DISMISS_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST'
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: 'REMOVE_TOAST',
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case 'DISMISS_TOAST':
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: 'UPDATE_TOAST',
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: 'DISMISS_TOAST',
            toastId: id
        });
    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    _s();
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: 'DISMISS_TOAST',
                toastId
            })
    };
}
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/admin-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminProvider",
    ()=>AdminProvider,
    "useAdmin",
    ()=>useAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AdminContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AdminProvider({ children }) {
    _s();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingProducts, setIsLoadingProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [errorProducts, setErrorProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blogPosts, setBlogPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingBlogPosts, setIsLoadingBlogPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [errorBlogPosts, setErrorBlogPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    // --- Product CRUD Operations ---
    const fetchProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[fetchProducts]": async ()=>{
            setIsLoadingProducts(true);
            setErrorProducts(null);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").select("*").order("created_at", {
                ascending: false
            });
            if (error) {
                setErrorProducts(error.message);
                toast({
                    title: "Error al cargar productos",
                    description: error.message,
                    variant: "destructive"
                });
                setProducts([]);
            } else {
                setProducts(data);
            }
            setIsLoadingProducts(false);
        }
    }["AdminProvider.useCallback[fetchProducts]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminProvider.useEffect": ()=>{
            fetchProducts();
        }
    }["AdminProvider.useEffect"], [
        fetchProducts
    ]);
    const addProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[addProduct]": async (product)=>{
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").insert(product).select().single();
                if (error) throw error;
                setProducts({
                    "AdminProvider.useCallback[addProduct]": (prev)=>[
                            data,
                            ...prev
                        ]
                }["AdminProvider.useCallback[addProduct]"]);
                toast({
                    title: "Producto añadido",
                    description: `"${product.name}" ha sido añadido exitosamente.`
                });
                return Promise.resolve();
            } catch (err) {
                toast({
                    title: "Error al añadir producto",
                    description: err.message,
                    variant: "destructive"
                });
                return Promise.reject(err);
            }
        }
    }["AdminProvider.useCallback[addProduct]"], [
        toast
    ]);
    const updateProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[updateProduct]": async (id, updates)=>{
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").update(updates).eq("id", id).select().single();
                if (error) throw error;
                setProducts({
                    "AdminProvider.useCallback[updateProduct]": (prev)=>prev.map({
                            "AdminProvider.useCallback[updateProduct]": (p)=>p.id === id ? data : p
                        }["AdminProvider.useCallback[updateProduct]"])
                }["AdminProvider.useCallback[updateProduct]"]);
                toast({
                    title: "Producto actualizado",
                    description: `El producto "${updates.name || id}" ha sido actualizado.`
                });
                return Promise.resolve();
            } catch (err) {
                toast({
                    title: "Error al actualizar producto",
                    description: err.message,
                    variant: "destructive"
                });
                return Promise.reject(err);
            }
        }
    }["AdminProvider.useCallback[updateProduct]"], [
        toast
    ]);
    const deleteProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[deleteProduct]": async (id)=>{
            try {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").delete().eq("id", id);
                if (error) throw error;
                setProducts({
                    "AdminProvider.useCallback[deleteProduct]": (prev)=>prev.filter({
                            "AdminProvider.useCallback[deleteProduct]": (p)=>p.id !== id
                        }["AdminProvider.useCallback[deleteProduct]"])
                }["AdminProvider.useCallback[deleteProduct]"]);
                toast({
                    title: "Producto eliminado",
                    description: "El producto ha sido eliminado exitosamente."
                });
                return Promise.resolve();
            } catch (err) {
                toast({
                    title: "Error al eliminar producto",
                    description: err.message,
                    variant: "destructive"
                });
                return Promise.reject(err);
            }
        }
    }["AdminProvider.useCallback[deleteProduct]"], [
        toast
    ]);
    const getProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[getProduct]": async (id)=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").select("*").eq("id", id).single();
            if (error) {
                toast({
                    title: "Error al obtener producto",
                    description: error.message,
                    variant: "destructive"
                });
                return undefined;
            }
            return data;
        }
    }["AdminProvider.useCallback[getProduct]"], [
        toast
    ]);
    // --- Blog Post CRUD Operations ---
    const fetchBlogPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[fetchBlogPosts]": async ()=>{
            setIsLoadingBlogPosts(true);
            setErrorBlogPosts(null);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("blog_posts").select("*").order("published_at", {
                ascending: false
            });
            if (error) {
                setErrorBlogPosts(error.message);
                toast({
                    title: "Error al cargar publicaciones del blog",
                    description: error.message,
                    variant: "destructive"
                });
                setBlogPosts([]);
            } else {
                setBlogPosts(data);
            }
            setIsLoadingBlogPosts(false);
        }
    }["AdminProvider.useCallback[fetchBlogPosts]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminProvider.useEffect": ()=>{
            fetchBlogPosts();
        }
    }["AdminProvider.useEffect"], [
        fetchBlogPosts
    ]);
    const addBlogPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[addBlogPost]": async (post)=>{
            try {
                const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                if (!user) {
                    throw new Error("User not authenticated.");
                }
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("blog_posts").insert({
                    ...post,
                    author_id: user.id
                }).select().single();
                if (error) throw error;
                setBlogPosts({
                    "AdminProvider.useCallback[addBlogPost]": (prev)=>[
                            data,
                            ...prev
                        ]
                }["AdminProvider.useCallback[addBlogPost]"]);
                toast({
                    title: "Publicación de blog añadida",
                    description: `"${post.title}" ha sido añadido exitosamente.`
                });
                return Promise.resolve();
            } catch (err) {
                toast({
                    title: "Error al añadir publicación de blog",
                    description: err.message,
                    variant: "destructive"
                });
                return Promise.reject(err);
            }
        }
    }["AdminProvider.useCallback[addBlogPost]"], [
        toast
    ]);
    const updateBlogPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[updateBlogPost]": async (id, updates)=>{
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("blog_posts").update(updates).eq("id", id).select().single();
                if (error) throw error;
                setBlogPosts({
                    "AdminProvider.useCallback[updateBlogPost]": (prev)=>prev.map({
                            "AdminProvider.useCallback[updateBlogPost]": (p)=>p.id === id ? data : p
                        }["AdminProvider.useCallback[updateBlogPost]"])
                }["AdminProvider.useCallback[updateBlogPost]"]);
                toast({
                    title: "Publicación de blog actualizada",
                    description: `La publicación "${updates.title || id}" ha sido actualizada.`
                });
                return Promise.resolve();
            } catch (err) {
                toast({
                    title: "Error al actualizar publicación de blog",
                    description: err.message,
                    variant: "destructive"
                });
                return Promise.reject(err);
            }
        }
    }["AdminProvider.useCallback[updateBlogPost]"], [
        toast
    ]);
    const deleteBlogPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[deleteBlogPost]": async (id)=>{
            try {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("blog_posts").delete().eq("id", id);
                if (error) throw error;
                setBlogPosts({
                    "AdminProvider.useCallback[deleteBlogPost]": (prev)=>prev.filter({
                            "AdminProvider.useCallback[deleteBlogPost]": (p)=>p.id !== id
                        }["AdminProvider.useCallback[deleteBlogPost]"])
                }["AdminProvider.useCallback[deleteBlogPost]"]);
                toast({
                    title: "Publicación de blog eliminada",
                    description: "La publicación ha sido eliminada exitosamente."
                });
                return Promise.resolve();
            } catch (err) {
                toast({
                    title: "Error al eliminar publicación de blog",
                    description: err.message,
                    variant: "destructive"
                });
                return Promise.reject(err);
            }
        }
    }["AdminProvider.useCallback[deleteBlogPost]"], [
        toast
    ]);
    const getBlogPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminProvider.useCallback[getBlogPost]": async (id)=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("blog_posts").select("*").eq("id", id).single();
            if (error) {
                toast({
                    title: "Error al obtener publicación del blog",
                    description: error.message,
                    variant: "destructive"
                });
                return undefined;
            }
            return data;
        }
    }["AdminProvider.useCallback[getBlogPost]"], [
        toast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminContext.Provider, {
        value: {
            products,
            isLoadingProducts,
            errorProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            getProduct,
            blogPosts,
            isLoadingBlogPosts,
            errorBlogPosts,
            addBlogPost,
            updateBlogPost,
            deleteBlogPost,
            getBlogPost
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/admin-context.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
_s(AdminProvider, "aZHqJIhFPdlYtcEaXSKQnc1/ats=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = AdminProvider;
function useAdmin() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within AdminProvider");
    }
    return context;
}
_s1(useAdmin, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AdminProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_11b20914._.js.map