      {/* Category Form */}
      <div className="mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
        <Form onSubmit={handleCategorySubmit} className="space-y-4">
          <FormControl
            name="name"
            placeholder="Category Name"
            onChange={handleCategoryChange}
            required
          />
          <Button type="submit" variant="primary">Add Category</Button>
        </Form>
      </div>
  const [categories, setCategories] = useState([]);


const [categoryForm, setCategoryForm] = useState({ name: "" });

useEffect(() => {
  fetchCategories();
  fetchProducts();
}, []);

const fetchCategories = async () => {
  const { data } = await axios.get("http://localhost:8700/api/categories");
  setCategories(data);
};




const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };


  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8700/api/categories", categoryForm);
    fetchCategories();
  };
