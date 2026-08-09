"use client";

import Review from "@/app/components/Review";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Actions } from "@/redux/store";
import ProductsApi from "@/app/api/products/productsApi";

export default function DescriptionClient({
    initialDescription,
    initialAdditionalInfo
}: {
    initialDescription: any,
    initialAdditionalInfo: any
}) {
    const dispatch = useDispatch();
    const [select, setSelect] = useState<number>(0);
    const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
    const tabRefs = useRef<HTMLHeadingElement[]>([]);
    const { productId } = useParams<{ productId: string }>();

    // Get data from Redux for each tab
    const descriptionState = useSelector(
        (state: RootState) => state.productDescription,
    );
    const additionalDetailsState = useSelector(
        (state: RootState) => state.productAdditionalDetails,
    );
    const reviewsState = useSelector((state: RootState) => state.productReviews);

    useEffect(() => {
        if (initialDescription && !descriptionState?.data) {
            dispatch(Actions.set("productDescription", { data: initialDescription, loading: false, loadingState: true }));
        }
        if (initialAdditionalInfo && !additionalDetailsState?.data) {
            dispatch(Actions.set("productAdditionalDetails", { data: initialAdditionalInfo, loading: false, loadingState: true }));
        }
    }, [initialDescription, initialAdditionalInfo, dispatch, descriptionState?.data, additionalDetailsState?.data]);

    const description = descriptionState?.data || initialDescription;
    const additionalDetails = additionalDetailsState?.data || initialAdditionalInfo;
    const reviews = reviewsState?.items || [];

    const tabs = ["Description", "Additional Information", "Review"];

    // Lazy load reviews when tab is clicked
    const handleTabClick = async (tabIndex: number) => {
        setSelect(tabIndex);

        if (tabIndex === 2 && reviews.length === 0) {
            try {
                dispatch(
                    Actions.set("productReviews", { loading: true, loadingState: true }),
                );
                await ProductsApi.fetchProductReviews(productId as string);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        }
    };

    useEffect(() => {
        const updateLineStyle = () => {
            if (tabRefs.current[select]) {
                const tab = tabRefs.current[select];
                setLineStyle({
                    width: tab.offsetWidth,
                    left: tab.offsetLeft,
                });
            }
        };
        updateLineStyle();
        window.addEventListener("resize", updateLineStyle);
        return () => {
            window.removeEventListener("resize", updateLineStyle);
        };
    }, [select]);

    const specs = additionalDetails
        ? [
            { key: "Material", value: additionalDetails.material || "Not found" },
            {
                key: "Sizes",
                value: additionalDetails.sizes?.length
                    ? additionalDetails.sizes.map((s: any) => s.size).join(", ")
                    : "N/A",
            },
            {
                key: "Colors",
                value: additionalDetails.colors?.length
                    ? additionalDetails.colors.map((c: any) => c.color).join(", ")
                    : "N/A",
            },
            {
                key: "Origin Country",
                value: additionalDetails.originCountry || "N/A",
            },
            { key: "Brand", value: additionalDetails.brand || "N/A" },
        ]
        : [];

    return (
        <div className="flex flex-col mt-8 md:mt-20">
            <div className="relative flex justify-center gap-8 md:gap-16 items-center">
                {tabs.map((tab, index) => (
                    <h1
                        key={index}
                        ref={(el) => {
                            if (el) tabRefs.current[index] = el;
                        }}
                        onClick={() => handleTabClick(index)}
                        className="text-gray-600 md:text-2xl cursor-pointer relative"
                    >
                        {tab}
                    </h1>
                ))}

                <div
                    className="absolute -bottom-2.5 h-1 bg-black rounded-full transition-all duration-300 ease-in-out"
                    style={{
                        width: lineStyle.width,
                        left: lineStyle.left,
                    }}
                ></div>
            </div>
            <div className="w-full h-0.5 bg-gray-200 mt-2"></div>

            {/* description */}
            {select === 0 && (
                <div className="my-8 md:px-12">
                    {description?.description || "No description available."}
                </div>
            )}

            {/* additional info */}
            {select === 1 && (
                <div className="w-full my-8 overflow-hidden border border-border">
                    {!additionalDetails ? (
                        <div className="p-6 text-center">No additional information available</div>
                    ) : (
                        <>
                            <div className="bg-amber-300/80 px-6 py-4">
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                    <h3 className="col-span-1 font-semibold text-gray-900">Feature</h3>
                                    <h3 className="font-semibold text-gray-900">Description</h3>
                                </div>
                            </div>
                            <div className="divide-y divide-border">
                                {specs.map((spec, index) => (
                                    <div
                                        key={index}
                                        className={`px-6 py-4 grid grid-cols-2 md:grid-cols-6 gap-4 ${index % 2 === 0 ? "bg-background" : "bg-muted/30"
                                            }`}
                                    >
                                        <div className="col-span-1 font-medium text-muted-foreground">{spec.key}</div>
                                        <div className="md:col-span-5 text-foreground">{spec.value}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* reviews */}
            {select === 2 && (
                <div className="my-8">
                    {reviewsState?.loading ? "Loading reviews..." : <Review />}
                </div>
            )}
        </div>
    );
}
