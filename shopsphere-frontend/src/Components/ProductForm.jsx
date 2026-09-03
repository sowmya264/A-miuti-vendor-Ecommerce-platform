function ProductForm({

    formData,
    categories,
    handleChange,
    handleSubmit,
    buttonText

}) {

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow"
        >

            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            />

            <input
                type="text"
                name="slug"
                placeholder="Slug"
                value={formData.slug}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            />

            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            />

            <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            />

            <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            />

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border p-3 w-full mb-4"
            >

                <option value="">
                    Select Category
                </option>

                {categories.map((category) => (

                    <option
                        key={category.id}
                        value={category.id}
                    >

                        {category.category_name}

                    </option>

                ))}

            </select>

            <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded"
            >

                {buttonText}

            </button>

        </form>

    );

}

export default ProductForm;