import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCards from "@/components/ProductCards";
import { getProductById, getSimilarProducts } from "@/lib/actions"
import { spaceBetweenNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
    params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
    const product: Product = await getProductById(id);

    if (!product) redirect('/')

    const similarProducts = await getSimilarProducts(id);

    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image max-h-400 text-center flex flex-col">
                    <img src={product.image} alt={product.title}
                        className="max-h-full max-w-full m-auto flex-2"
                        width={330}
                        height={1000}
                    />

                    {/* <Image 
                         src={product.image}
                         alt={product.title}
                         width={330}
                         height={400}
                         className="max-h-full max-w-full m-auto flex-2"
                         fetchPriority="high"
                     /> */}
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] text-secondary font-semibold">
                                {product.title}
                            </p>

                            <Link
                                href={product.url}
                                target="_blank"
                                className="text-base text-black opacity-50"
                            >
                                Visit Product
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="product-hearts">
                                <Image
                                    src="/assets/icons/red-heart.svg"
                                    alt="heart"
                                    width={20}
                                    height={20}
                                />

                                <p className="text-base font-semibold text-[#D46F77]">
                                    {spaceBetweenNumber(product.reviewsCount)}
                                </p>
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src="/assets/icons/bookmark.svg"
                                    alt="bookmark"
                                    width={20}
                                    height={20}
                                />
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src="/assets/icons/share.svg"
                                    alt="share"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-secondary font-bold">
                                {product.currentPrice} {product.currency}
                            </p>
                            {product.originalPrice == product.currentPrice ||
                                <p className="text-[21px] text-black opacity-50 line-through">
                                    {product.originalPrice} {product.currency}
                                </p>}
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <div className="product-stars">
                                    <Image
                                        src="/assets/icons/star.svg"
                                        alt="star"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-sm text-primary-orange font-semibold">
                                        {product.stars || '0'}
                                    </p>
                                </div>

                                <div className="product-reviews">
                                    <Image
                                        src="/assets/icons/comment.svg"
                                        alt="comment"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-sm text-secondary font-semibold">
                                        {spaceBetweenNumber(product.reviewsCount)} Reviews
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-black opacity-50">
                                <span className="text-primary-green font-semibold">
                                    {(product.stars * 100 / 5).toFixed(0)}%
                                </span> of buyers have recommeded this.
                            </p>
                        </div>
                    </div>

                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">
                            <PriceInfoCard
                                title="Current Price"
                                iconSrc="/assets/icons/price-tag.svg"
                                value={`${product.currentPrice} ${product.currency}`}
                            />
                            <PriceInfoCard
                                title="Average Price"
                                iconSrc="/assets/icons/chart.svg"
                                value={`${product.averagePrice} ${product.currency}`}
                            />
                            <PriceInfoCard
                                title="Highest Price"
                                iconSrc="/assets/icons/arrow-up.svg"
                                value={`${product.highestPrice} ${product.currency}`}
                            />
                            <PriceInfoCard
                                title="Lowest Price"
                                iconSrc="/assets/icons/arrow-down.svg"
                                value={`${product.lowestPrice} ${product.currency}`}
                            />
                        </div>
                    </div>

                    <Modal productId={id} />
                </div>
            </div>

            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-5">
                    <h3 className="text-2xl text-secondary font-semibold">
                        Product Description
                    </h3>

                    <div className="flex flex-col gap-4">
                        {product?.description?.split('\n')}
                    </div>
                </div>

                <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
                    <Image
                        src="/assets/icons/bag.svg"
                        alt="check"
                        width={22}
                        height={22}
                    />

                    <Link href="/" className="text-base text-white">
                        Buy Now
                    </Link>
                </button>
            </div>

            {similarProducts && similarProducts?.length > 0 && (
                <div className="py-14 flex flex-col gap-2 w-full">
                    <p className="section-text">Similar Products</p>

                    <div className="flex flex-wrap gap-10 mt-7 w-full">
                        {similarProducts.map((product) => (
                            <ProductCards key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails