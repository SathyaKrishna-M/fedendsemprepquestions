const examData = [
  {
    id: "set-1",
    title: "Set 1: React Fundamentals & Advanced Patterns",
    questions: [
      {
        type: "Q1",
        text: `Build a Course Enrollment application in React where students can enroll in additional/summer term courses. Use input fields to collect the student name and course name, and display an "Enroll Now" button. Use the useState hook with an object state variable (useState({})) to manage form data and enrollment count dynamically. Display enrolled student details and total enrollment count. Implement validation to prevent empty submissions. Use reusable event handling logic using the name attribute.`,
        answer: `
<pre><code>import React, { useState } from 'react';

const CourseEnrollment = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    enrollments: [],
    count: 0
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnroll = (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.courseName.trim()) {
      setError('Both Student Name and Course Name are required!');
      return;
    }
    
    setError('');
    const newEnrollment = {
      studentName: formData.studentName,
      courseName: formData.courseName
    };

    setFormData(prev => ({
      ...prev,
      studentName: '',
      courseName: '',
      enrollments: [...prev.enrollments, newEnrollment],
      count: prev.count + 1
    }));
  };

  return (
    &lt;div className="p-4"&gt;
      &lt;h2 className="text-xl font-bold"&gt;Course Enrollment&lt;/h2&gt;
      {error && &lt;p className="text-red-500"&gt;{error}&lt;/p&gt;}
      
      &lt;form onSubmit={handleEnroll} className="flex flex-col gap-3 mt-4"&gt;
        &lt;input 
          type="text" 
          name="studentName" 
          placeholder="Student Name"
          value={formData.studentName} 
          onChange={handleChange} 
          className="border p-2 rounded"
        /&gt;
        &lt;input 
          type="text" 
          name="courseName" 
          placeholder="Course Name"
          value={formData.courseName} 
          onChange={handleChange} 
          className="border p-2 rounded"
        /&gt;
        &lt;button type="submit" className="bg-blue-500 text-white p-2 rounded"&gt;
          Enroll Now
        &lt;/button&gt;
      &lt;/form&gt;

      &lt;div className="mt-6"&gt;
        &lt;h3 className="font-semibold"&gt;Enrollments (Total: {formData.count})&lt;/h3&gt;
        &lt;ul className="list-disc pl-5 mt-2"&gt;
          {formData.enrollments.map((item, idx) => (
            &lt;li key={idx}&gt;{item.studentName} - {item.courseName}&lt;/li&gt;
          ))}
        &lt;/ul&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default CourseEnrollment;</code></pre>`
      },
      {
        type: "Q2",
        text: `Build a Recipe Blog UI application in React using Tailwind CSS and fetch recipe data from the DummyJSON API. Display recipes in a responsive card layout showing recipe image, title, cook time, difficulty level, rating, and a "View Recipe" button. Use useState and useEffect for data fetching. Display Skeleton UI cards while fetching. Implement cache memory logic to prevent multiple unnecessary API calls.`,
        answer: `
<pre><code>import React, { useState, useEffect, useRef } from 'react';

const RecipeBlog = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const cache = useRef(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (cache.current) {
        setRecipes(cache.current);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('https://dummyjson.com/recipes');
        const data = await res.json();
        cache.current = data.recipes;
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4"&gt;
        {[...Array(6)].map((_, i) => (
          &lt;div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg shadow-md"&gt;&lt;/div&gt;
        ))}
      &lt;/div&gt;
    );
  }

  return (
    &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"&gt;
      {recipes.map(recipe => (
        &lt;div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden"&gt;
          &lt;img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" /&gt;
          &lt;div className="p-4"&gt;
            &lt;h3 className="text-xl font-bold text-gray-800"&gt;{recipe.name}&lt;/h3&gt;
            &lt;div className="text-gray-600 mt-2 flex justify-between text-sm"&gt;
              &lt;span&gt;⏱ {recipe.cookTimeMinutes} mins&lt;/span&gt;
              &lt;span&gt;⭐ {recipe.rating}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="mt-1 text-sm text-gray-500"&gt;Difficulty: {recipe.difficulty}&lt;/div&gt;
            &lt;button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"&gt;
              View Recipe
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
};

export default RecipeBlog;</code></pre>`
      },
      {
        type: "Q3",
        text: `Create an Expense Tracker application in React using useState[] and useEffect. Create input fields expense_title and amount inside an object state variable (useState({})). Add buttons to Add and Delete Expenses. Use Tailwind CSS. Use localStorage to store data and useEffect to load on start. Display expense title, amount, and total dynamically. Implement validation for empty/invalid entries.`,
        answer: `
<pre><code>import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ title: '', amount: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.amount || isNaN(formData.amount)) {
      setError('Please enter a valid title and numeric amount.');
      return;
    }
    setError('');
    setExpenses([...expenses, { id: Date.now(), ...formData }]);
    setFormData({ title: '', amount: '' });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const total = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  return (
    &lt;div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10"&gt;
      &lt;h2 className="text-2xl font-bold text-gray-800 text-center"&gt;Expense Tracker&lt;/h2&gt;
      &lt;h3 className="text-xl text-center text-blue-600 my-4"&gt;Total: \${total.toFixed(2)}&lt;/h3&gt;
      
      {error && &lt;p className="text-red-500 text-sm mb-2"&gt;{error}&lt;/p&gt;}
      
      &lt;form onSubmit={handleAdd} className="flex flex-col gap-3"&gt;
        &lt;input 
          className="border p-2 rounded text-gray-800" 
          placeholder="Expense Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        /&gt;
        &lt;input 
          className="border p-2 rounded text-gray-800" 
          placeholder="Amount" 
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})} 
        /&gt;
        &lt;button type="submit" className="bg-green-500 text-white p-2 rounded font-semibold"&gt;
          Add Expense
        &lt;/button&gt;
      &lt;/form&gt;

      &lt;ul className="mt-6 space-y-3"&gt;
        {expenses.map(exp => (
          &lt;li key={exp.id} className="flex justify-between items-center bg-gray-100 p-3 rounded text-gray-800"&gt;
            &lt;span&gt;{exp.title}&lt;/span&gt;
            &lt;div&gt;
              &lt;span className="font-bold mr-4"&gt;\${parseFloat(exp.amount).toFixed(2)}&lt;/span&gt;
              &lt;button onClick={() => handleDelete(exp.id)} className="text-red-500 font-bold"&gt;X&lt;/button&gt;
            &lt;/div&gt;
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
};

export default ExpenseTracker;</code></pre>`
      },
      {
        type: "Q4",
        text: `Testing: Create a Login page in React with email and password fields. When the user enters valid credentials, display a success message; otherwise, display an error message. Write unit test cases using React Testing Library and Jest to test both successful and invalid login scenarios`,
        answer: `
<p><strong>Login Component (Login.jsx)</strong></p>
<pre><code>import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@test.com' && password === '12345') {
      setMsg('Login Success');
    } else {
      setMsg('Invalid Credentials');
    }
  };

  return (
    &lt;form onSubmit={handleLogin}&gt;
      &lt;input placeholder="Email" data-testid="email" value={email} onChange={e => setEmail(e.target.value)} /&gt;
      &lt;input placeholder="Password" data-testid="password" type="password" value={password} onChange={e => setPassword(e.target.value)} /&gt;
      &lt;button type="submit" data-testid="submit"&gt;Login&lt;/button&gt;
      {msg && &lt;p data-testid="msg"&gt;{msg}&lt;/p&gt;}
    &lt;/form&gt;
  );
};

export default Login;</code></pre>

<p><strong>Test File (Login.test.jsx)</strong></p>
<pre><code>import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('valid login shows success message', () => {
  render(&lt;Login /&gt;);
  fireEvent.change(screen.getByTestId('email'), { target: { value: 'admin@test.com' } });
  fireEvent.change(screen.getByTestId('password'), { target: { value: '12345' } });
  fireEvent.click(screen.getByTestId('submit'));
  expect(screen.getByTestId('msg')).toHaveTextContent('Login Success');
});

test('invalid login shows error message', () => {
  render(&lt;Login /&gt;);
  fireEvent.change(screen.getByTestId('email'), { target: { value: 'wrong@test.com' } });
  fireEvent.change(screen.getByTestId('password'), { target: { value: '123' } });
  fireEvent.click(screen.getByTestId('submit'));
  expect(screen.getByTestId('msg')).toHaveTextContent('Invalid Credentials');
});</code></pre>`
      },
      {
        type: "Q5",
        text: `Lifted State: A currency converter application has two input boxes — USD and INR. When the user enters an amount in one box, the converted value should appear in the other. State should be managed in the parent component and passed to child components through props. Write a React application to implement this using lifted state.`,
        answer: `
<pre><code>import React, { useState } from 'react';

const CONVERSION_RATE = 83; // 1 USD = 83 INR

const CurrencyInput = ({ currency, value, onValueChange }) => (
  &lt;div className="mb-4"&gt;
    &lt;label className="mr-2 font-bold"&gt;{currency}:&lt;/label&gt;
    &lt;input 
      type="number" 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)} 
      className="border p-1"
    /&gt;
  &lt;/div&gt;
);

const CurrencyConverter = () => {
  const [usd, setUsd] = useState('');
  const [inr, setInr] = useState('');

  const handleUsdChange = (val) => {
    setUsd(val);
    setInr(val === '' ? '' : (parseFloat(val) * CONVERSION_RATE).toFixed(2));
  };

  const handleInrChange = (val) => {
    setInr(val);
    setUsd(val === '' ? '' : (parseFloat(val) / CONVERSION_RATE).toFixed(2));
  };

  return (
    &lt;div className="p-8 border w-fit text-gray-800 bg-white"&gt;
      &lt;h2 className="text-xl mb-4 font-bold"&gt;Currency Converter&lt;/h2&gt;
      &lt;CurrencyInput currency="USD" value={usd} onValueChange={handleUsdChange} /&gt;
      &lt;CurrencyInput currency="INR" value={inr} onValueChange={handleInrChange} /&gt;
    &lt;/div&gt;
  );
};

export default CurrencyConverter;</code></pre>`
      },
      {
        type: "Q6",
        text: `API Cache Race Condition: A shopping website has a product search box. When the user types, matching products should be fetched from an API. If the same product is searched again, load from cache using useRef(). Cancel previous API requests when the user types fast to avoid showing incorrect results. Write a React application to implement this.`,
        answer: `
<pre><code>import React, { useState, useEffect, useRef } from 'react';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const cache = useRef({});

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    if (cache.current[query]) {
      setResults(cache.current[query]);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const res = await fetch(\`https://dummyjson.com/products/search?q=\${query}\`, {
          signal: controller.signal
        });
        const data = await res.json();
        cache.current[query] = data.products;
        setResults(data.products);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted for query:', query);
        }
      }
    };

    // Debounce the fetch slightly
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort(); // Cancel the fetch if the component unmounts or query changes
    };
  }, [query]);

  return (
    &lt;div className="p-4"&gt;
      &lt;input 
        type="text" 
        placeholder="Search products..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4 text-gray-800"
      /&gt;
      &lt;ul className="list-disc pl-5"&gt;
        {results.map(prod => (
          &lt;li key={prod.id} className="text-white"&gt;{prod.title} - \${prod.price}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
};

export default ProductSearch;</code></pre>`
      },
      {
        type: "Viva A.1",
        text: `Why is a controlled component preferred in forms engineering?`,
        answer: `
<p>Controlled components keep the React state as the "single source of truth". This enables instant input validation, conditionally disabling buttons, formatting values as they are typed, and seamless synchronization between the UI and the application's state logic.</p>`
      },
      {
        type: "Viva A.2",
        text: `What is the stale state problem? How can it be avoided?`,
        answer: `
<p><strong>Stale state</strong> happens when a closure (like an event listener, ` + '`' + `setTimeout` + '`' + `, or an ` + '`' + `useEffect` + '`' + ` without proper dependencies) references an old version of a state variable.</p>
<p><strong>To avoid it:</strong> Use functional state updates (e.g., ` + '`' + `setCount(prev => prev + 1)` + '`' + `), ensure all dependencies are in the ` + '`' + `useEffect` + '`' + ` dependency array, or use ` + '`' + `useRef` + '`' + ` for mutable values that shouldn't trigger renders.</p>`
      },
      {
        type: "Viva A.3",
        text: `What is the purpose of an Error Boundary? What happens if there is no boundary?`,
        answer: `
<p><strong>Purpose:</strong> Error Boundaries catch JavaScript errors anywhere in their child component tree, log them, and display a fallback UI instead of crashing the entire component tree.</p>
<p><strong>If there is no boundary:</strong> An error in a component will propagate up to the root, causing React to completely unmount the UI, resulting in a blank white screen.</p>`
      },
      {
        type: "Viva A.4",
        text: `Differentiate between Imperative programming and Declarative programming.`,
        answer: `
<p><strong>Imperative:</strong> Describes <em>how</em> to do something step-by-step. (e.g., vanilla JS ` + '`' + `document.createElement(...)` + '`' + `, ` + '`' + `element.appendChild(...)` + '`' + `).</p>
<p><strong>Declarative:</strong> Describes <em>what</em> you want to happen, letting the framework figure out the steps. (e.g., React JSX where you just define how the UI should look for a given state).</p>`
      },
      {
        type: "Viva A.5",
        text: `What is the benefit of having cache memory with API calls?`,
        answer: `
<p>Benefits include significantly reduced network traffic, faster UI load times since data is read locally, lower strain on the backend servers, and improved user experience on slow networks.</p>`
      },
      {
        type: "Viva B.1",
        text: `What is the purpose of the useState hook? Why do we need it?`,
        answer: `
<p>The ` + '`' + `useState` + '`' + ` hook is used to add state variables to functional components. We need it because standard variables do not trigger a UI re-render when they change. ` + '`' + `useState` + '`' + ` tells React to re-render the component with the new value whenever the state is updated.</p>`
      },
      {
        type: "Viva B.2",
        text: `When should state be lifted to the parent component? Explain derived state.`,
        answer: `
<p><strong>Lifting State:</strong> State should be lifted to the closest common parent when two or more sibling components need to share or synchronize that state (like the USD and INR inputs in a currency converter).</p>
<p><strong>Derived State:</strong> This is a value computed directly from existing state or props during rendering (e.g., ` + '`' + `const isAdult = age >= 18;` + '`' + `). It prevents redundancy and synchronization bugs by not storing the computed value in its own ` + '`' + `useState` + '`' + `.</p>`
      },
      {
        type: "Viva B.3",
        text: `Explain the benefits of using Tailwind CSS instead of traditional CSS.`,
        answer: `
<p>Tailwind CSS provides utility-first classes, leading to:</p>
<ul>
    <li>Faster styling without leaving the HTML/JSX.</li>
    <li>No need to invent class names (solving naming fatigue).</li>
    <li>Smaller final CSS bundles (purging unused classes).</li>
    <li>Easier maintenance since styles are localized to components rather than in a global stylesheet.</li>
</ul>`
      },
      {
        type: "Viva B.4",
        text: `Explain the purpose of protected routing.`,
        answer: `
<p>Protected routing ensures that specific pages (like a Dashboard or Profile) are only accessible to authenticated or authorized users. If a user is not logged in and tries to access a protected route, they are automatically redirected to a login page or an unauthorized error page.</p>`
      },
      {
        type: "Viva B.5",
        text: `What is side-effect code in React? When do we use the useEffect hook? Write the syntax of useEffect.`,
        answer: `
<p><strong>Side-effect code</strong> is anything that interacts with the outside world beyond returning JSX (e.g., fetching data, setting timers, manually modifying the DOM).</p>
<p>We use ` + '`' + `useEffect` + '`' + ` to handle these side effects so they happen after the component renders.</p>
<p><strong>Syntax:</strong></p>
<pre><code>useEffect(() => {
  // Side effect code here
  return () => {
    // Optional cleanup code
  };
}, [dependencies]);</code></pre>`
      },
      {
        type: "Viva C.1",
        text: `Why do we perform testing? Differentiate unit testing and integration testing.`,
        answer: `
<p>We perform testing to ensure the application works as expected, prevent regressions, and improve code reliability.</p>
<p><strong>Unit Testing:</strong> Tests individual, isolated pieces of code (like a single function or an isolated component). Example: Testing if a button renders.</p>
<p><strong>Integration Testing:</strong> Tests how multiple units work together. Example: Testing if clicking a "Buy" button in the Product List updates the count in the Shopping Cart component.</p>`
      },
      {
        type: "Viva C.2",
        text: `Are props mutable or immutable? Is props flow unidirectional or bidirectional? Justify your answer.`,
        answer: `
<p><strong>Immutable:</strong> Props are immutable (read-only) because modifying them would violate React's core principle of predictable state updates and pure functions.</p>
<p><strong>Unidirectional:</strong> Data flow is unidirectional (top-down) from parent to child. If a child needs to modify data, the parent must pass down a callback function via props that the child can call, maintaining the single source of truth in the parent.</p>`
      },
      {
        type: "Viva C.3",
        text: `Why do we deploy or host a developed project in the production phase?`,
        answer: `
<p>We deploy a project so that it is accessible to end-users on the internet, running on optimized, highly available servers rather than a local development machine. Production builds are optimized (minified code, removed warnings, compressed assets) for speed and performance.</p>`
      },
      {
        type: "Viva C.4",
        text: `Write the React rendering UI pipeline.`,
        answer: `
<ol>
    <li><strong>Trigger:</strong> A state update or initial render is triggered.</li>
    <li><strong>Render Phase:</strong> React calls your component functions to figure out what the UI should look like and generates the new Virtual DOM tree.</li>
    <li><strong>Reconciliation:</strong> React compares (diffs) the new Virtual DOM with the old Virtual DOM to find the exact changes needed.</li>
    <li><strong>Commit Phase:</strong> React applies those exact changes to the actual browser DOM.</li>
</ol>`
      },
      {
        type: "Viva C.5",
        text: `Differentiate between Container and Presentational components.`,
        answer: `
<p><strong>Container Components:</strong> Focus on <em>how things work</em>. They manage state, fetch data, contain business logic, and pass data down as props. (Usually stateful).</p>
<p><strong>Presentational Components:</strong> Focus on <em>how things look</em>. They receive data and callbacks exclusively via props and render UI elements (like styled buttons or cards). (Usually stateless and highly reusable).</p>`
      }
    ]
  },
  {
    id: "set-2",
    title: "Set 2: React Components, Context API & Testing",
    questions: [
      {
        type: "Q1",
        text: `Create a Product Card application in React using functional components and useState. Store product name, price, discount percentage, and quantity inside an object state variable in App and pass as props to ProductCard. Create buttons to Apply Discount and Toggle Wishlist. Display discounted price dynamically. Use conditional rendering to show "Out of Stock" if quantity is 0, otherwise show "Add to Cart" button.`,
        answer: `
<pre><code>import React, { useState } from 'react';

const ProductCard = ({ product, onApplyDiscount, onToggleWishlist }) => {
  const discountedPrice = product.price - (product.price * product.discount / 100);

  return (
    &lt;div className="border p-4 rounded shadow-lg max-w-sm bg-white text-gray-800"&gt;
      &lt;h3 className="text-xl font-bold"&gt;{product.name}&lt;/h3&gt;
      &lt;div className="mt-2"&gt;
        &lt;span className="line-through mr-2 text-gray-500"&gt;$\${product.price}&lt;/span&gt;
        &lt;span className="text-green-600 font-bold"&gt;$\${discountedPrice.toFixed(2)}&lt;/span&gt;
      &lt;/div&gt;
      
      &lt;div className="mt-4 flex gap-2"&gt;
        &lt;button onClick={onApplyDiscount} className="bg-blue-500 text-white px-3 py-1 rounded"&gt;
          Apply 10% Discount
        &lt;/button&gt;
        &lt;button onClick={onToggleWishlist} className="bg-pink-500 text-white px-3 py-1 rounded"&gt;
          {product.inWishlist ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
        &lt;/button&gt;
      &lt;/div&gt;

      &lt;div className="mt-4"&gt;
        {product.quantity === 0 ? (
          &lt;span className="text-red-500 font-bold"&gt;Out of Stock&lt;/span&gt;
        ) : (
          &lt;button className="bg-green-600 text-white px-4 py-2 rounded w-full"&gt;
            Add to Cart
          &lt;/button&gt;
        )}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

const App = () => {
  const [product, setProduct] = useState({
    name: 'Wireless Headphones',
    price: 150,
    discount: 0,
    quantity: 5,
    inWishlist: false
  });

  const handleApplyDiscount = () => setProduct(prev => ({ ...prev, discount: 10 }));
  const handleToggleWishlist = () => setProduct(prev => ({ ...prev, inWishlist: !prev.inWishlist }));

  return (
    &lt;div className="p-8"&gt;
      &lt;ProductCard 
        product={product} 
        onApplyDiscount={handleApplyDiscount} 
        onToggleWishlist={handleToggleWishlist} 
      /&gt;
    &lt;/div&gt;
  );
};

export default App;</code></pre>`
      },
      {
        type: "Q2",
        text: `Create a Food Menu application in React using functional components and props. Display food image, food name, price, category, rating, and availability status inside styled cards. Maintain all details as a list of objects. Create a reusable FoodItemCard component and reuse it to display different food items received through props.`,
        answer: `
<pre><code>import React from 'react';

const FoodItemCard = ({ food }) => (
  &lt;div className="border rounded-lg shadow-md overflow-hidden bg-white text-gray-800"&gt;
    &lt;img src={food.image} alt={food.name} className="w-full h-48 object-cover" /&gt;
    &lt;div className="p-4"&gt;
      &lt;div className="flex justify-between items-center mb-2"&gt;
        &lt;h3 className="text-lg font-bold"&gt;{food.name}&lt;/h3&gt;
        &lt;span className="text-sm bg-gray-200 px-2 py-1 rounded"&gt;{food.category}&lt;/span&gt;
      &lt;/div&gt;
      &lt;div className="text-gray-600 mb-2 flex justify-between"&gt;
        &lt;span&gt;$\${food.price}&lt;/span&gt;
        &lt;span&gt;⭐ {food.rating}&lt;/span&gt;
      &lt;/div&gt;
      &lt;p className={\`font-semibold \${food.available ? 'text-green-600' : 'text-red-500'}\`}&gt;
        {food.available ? 'Available' : 'Currently Unavailable'}
      &lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);

const FoodMenu = () => {
  const foodList = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Italian', rating: 4.5, available: true, image: 'pizza.jpg' },
    { id: 2, name: 'Cheeseburger', price: 8.99, category: 'American', rating: 4.2, available: false, image: 'burger.jpg' },
    { id: 3, name: 'Sushi Platter', price: 24.50, category: 'Japanese', rating: 4.8, available: true, image: 'sushi.jpg' }
  ];

  return (
    &lt;div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6"&gt;
      {foodList.map(food => (
        &lt;FoodItemCard key={food.id} food={food} /&gt;
      ))}
    &lt;/div&gt;
  );
};

export default FoodMenu;</code></pre>`
      },
      {
        type: "Q3",
        text: `Context API: A college student portal has Navbar, Dashboard, and Attendance Panel components. Student name should display in Navbar and attendance percentage in Attendance Panel. Create a separate Context file to share data globally. Write a React application using Context API so any component can access student data directly without prop drilling`,
        answer: `
<p><strong>1. StudentContext.js</strong></p>
<pre><code>import React, { createContext, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({
    name: 'John Doe',
    attendance: 85
  });

  return (
    &lt;StudentContext.Provider value={{ student }}&gt;
      {children}
    &lt;/StudentContext.Provider&gt;
  );
};</code></pre>

<p><strong>2. App Components (App.js)</strong></p>
<pre><code>import React, { useContext } from 'react';
import { StudentProvider, StudentContext } from './StudentContext';

const Navbar = () => {
  const { student } = useContext(StudentContext);
  return (
    &lt;nav className="bg-blue-600 text-white p-4 flex justify-between"&gt;
      &lt;h1&gt;College Portal&lt;/h1&gt;
      &lt;span&gt;Welcome, {student.name}&lt;/span&gt;
    &lt;/nav&gt;
  );
};

const AttendancePanel = () => {
  const { student } = useContext(StudentContext);
  return (
    &lt;div className="border p-4 mt-4 bg-white text-gray-800"&gt;
      &lt;h3 className="font-bold"&gt;Attendance Record&lt;/h3&gt;
      &lt;p&gt;Current Attendance: {student.attendance}%&lt;/p&gt;
    &lt;/div&gt;
  );
};

const Dashboard = () => (
  &lt;div className="p-6"&gt;
    &lt;h2 className="text-2xl"&gt;Student Dashboard&lt;/h2&gt;
    &lt;AttendancePanel /&gt;
  &lt;/div&gt;
);

const App = () => (
  &lt;StudentProvider&gt;
    &lt;div&gt;
      &lt;Navbar /&gt;
      &lt;Dashboard /&gt;
    &lt;/div&gt;
  &lt;/StudentProvider&gt;
);

export default App;</code></pre>`
      },
      {
        type: "Q4",
        text: `Testing: Create a React Password Strength Checker component where the user enters a password and the application validates minimum length, uppercase letter, lowercase letter, digit, and special symbol. Display appropriate validation messages or a strong password message. Write unit test cases using React Testing Library and Jest to test all password validation scenarios.`,
        answer: `
<p><strong>PasswordChecker.jsx</strong></p>
<pre><code>import React, { useState } from 'react';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');

  const validatePassword = (pwd) => {
    if (pwd.length &lt; 8) return 'Minimum 8 characters required';
    if (!/[A-Z]/.test(pwd)) return 'At least one uppercase letter required';
    if (!/[a-z]/.test(pwd)) return 'At least one lowercase letter required';
    if (!/[0-9]/.test(pwd)) return 'At least one digit required';
    if (!/[!@#$%^&*]/.test(pwd)) return 'At least one special character required';
    return 'Strong Password!';
  };

  const message = password ? validatePassword(password) : '';

  return (
    &lt;div&gt;
      &lt;input 
        type="password" 
        data-testid="password-input"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Enter password"
      /&gt;
      {message && &lt;p data-testid="validation-msg"&gt;{message}&lt;/p&gt;}
    &lt;/div&gt;
  );
};

export default PasswordChecker;</code></pre>

<p><strong>PasswordChecker.test.jsx</strong></p>
<pre><code>import { render, screen, fireEvent } from '@testing-library/react';
import PasswordChecker from './PasswordChecker';

describe('PasswordChecker', () => {
  test('shows minimum length error', () => {
    render(&lt;PasswordChecker /&gt;);
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Short1!' } });
    expect(screen.getByTestId('validation-msg')).toHaveTextContent('Minimum 8 characters required');
  });

  test('shows uppercase error', () => {
    render(&lt;PasswordChecker /&gt;);
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'nouppercase1!' } });
    expect(screen.getByTestId('validation-msg')).toHaveTextContent('At least one uppercase letter required');
  });

  test('shows lowercase error', () => {
    render(&lt;PasswordChecker /&gt;);
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'NOLOWERCASE1!' } });
    expect(screen.getByTestId('validation-msg')).toHaveTextContent('At least one lowercase letter required');
  });

  test('shows digit error', () => {
    render(&lt;PasswordChecker /&gt;);
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'NoDigitsHere!' } });
    expect(screen.getByTestId('validation-msg')).toHaveTextContent('At least one digit required');
  });

  test('shows special character error', () => {
    render(&lt;PasswordChecker /&gt;);
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'NoSpecialChar1' } });
    expect(screen.getByTestId('validation-msg')).toHaveTextContent('At least one special character required');
  });

  test('shows strong password message', () => {
    render(&lt;PasswordChecker /&gt;);
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'StrongPass1!' } });
    expect(screen.getByTestId('validation-msg')).toHaveTextContent('Strong Password!');
  });
});</code></pre>`
      },
      {
        type: "Viva A.1",
        text: `What is the purpose of TypeScript? Differentiate between Interface and Type Alias.`,
        answer: `
<p><strong>Purpose of TypeScript:</strong> TypeScript is a superset of JavaScript that adds static typing. It helps catch errors at compile-time instead of runtime, improves code readability, and provides better IDE auto-completion.</p>
<p><strong>Interface vs Type Alias:</strong></p>
<ul>
  <li><strong>Interface:</strong> Used specifically for defining the shape of objects. Interfaces can be merged (declaration merging) if defined multiple times.</li>
  <li><strong>Type Alias:</strong> Can represent objects, but also primitives, unions, and tuples. Types cannot be merged; once defined, they cannot be modified.</li>
</ul>`
      },
      {
        type: "Viva A.2",
        text: `Which library is installed to support routing? Explain SPA and why routing is required.`,
        answer: `
<p><strong>Library:</strong> ` + '`' + `react-router-dom` + '`' + ` is typically installed for React routing.</p>
<p><strong>SPA (Single Page Application):</strong> A web application that loads a single HTML document and dynamically updates the content via JavaScript as the user interacts with the app, without reloading the page from the server.</p>
<p><strong>Why routing is required:</strong> Routing maps URLs to specific components, allowing users to navigate between different "views" in an SPA, share links to specific pages, and use browser back/forward buttons seamlessly.</p>`
      },
      {
        type: "Viva A.3",
        text: `List the common styles generally applied on a button.`,
        answer: `
<p>Common button styles include:</p>
<ul>
  <li>Padding (e.g., ` + '`' + `padding: 10px 20px;` + '`' + `) for click area</li>
  <li>Background Color & Text Color</li>
  <li>Border and Border Radius (rounded corners)</li>
  <li>Cursor (` + '`' + `cursor: pointer;` + '`' + `)</li>
  <li>Hover/Active states (changing background color on interaction)</li>
  <li>Font weight and size</li>
</ul>`
      },
      {
        type: "Viva A.4",
        text: `Explain race condition in the context of a search API endpoint.`,
        answer: `
<p>A race condition occurs when multiple async API calls are fired rapidly (e.g., searching for "c", then "ca", then "cat"). If the response for "c" takes longer than "cat", the outdated response for "c" might arrive last and overwrite the correct UI state for "cat", showing incorrect results to the user.</p>`
      },
      {
        type: "Viva A.5",
        text: `Explain Conditional Rendering in React with an example. If the state variable errorMsg is not empty, display the error message using the tag`,
        answer: `
<p>Conditional rendering allows React components to render different UI elements based on certain conditions (usually state or props), using standard JavaScript operators like ` + '`' + `&&` + '`' + ` or ternary operators.</p>
<p><strong>Example:</strong></p>
<pre><code>{errorMsg !== '' && &lt;div className="error"&gt;{errorMsg}&lt;/div&gt;}</code></pre>
<p>Alternatively:</p>
<pre><code>{errorMsg ? &lt;p&gt;{errorMsg}&lt;/p&gt; : null}</code></pre>`
      },
      {
        type: "Viva B.1",
        text: `Explain DOM vs Virtual DOM and what is reconciliation.`,
        answer: `
<p><strong>DOM (Document Object Model):</strong> The browser's structural representation of HTML. Updating it is slow and expensive.</p>
<p><strong>Virtual DOM:</strong> A lightweight JavaScript representation of the DOM kept in memory by React. Updating it is fast.</p>
<p><strong>Reconciliation:</strong> The process where React compares the newly generated Virtual DOM with the previous Virtual DOM (using a diffing algorithm) to determine the exact changes needed, and then applies <em>only</em> those specific changes to the actual DOM.</p>`
      },
      {
        type: "Viva B.2",
        text: `What is Virtual DOM (VDOM)? When will it be created and re-created?`,
        answer: `
<p>The Virtual DOM is an in-memory representation of the actual DOM elements generated by React components.</p>
<p>It is <strong>created</strong> during the initial render of the application. It is <strong>re-created</strong> (or specifically, a new version is created) whenever a component's state (` + '`' + `useState` + '`' + `) or props change, triggering a re-render phase.</p>`
      },
      {
        type: "Viva B.3",
        text: `What is prop drilling? Explain the steps to create global state using Context API.`,
        answer: `
<p><strong>Prop Drilling:</strong> Passing data as props through multiple layers of intermediate components that don't need the data themselves, just to get it to a deeply nested child component.</p>
<p><strong>Steps for Context API:</strong></p>
<ol>
  <li><strong>Create Context:</strong> ` + '`' + `const MyContext = createContext();` + '`' + `</li>
  <li><strong>Provide Context:</strong> Wrap the parent component with ` + '`' + `&lt;MyContext.Provider value={data}&gt;` + '`' + ` to supply the state globally.</li>
  <li><strong>Consume Context:</strong> In any child component, use ` + '`' + `const data = useContext(MyContext);` + '`' + ` to access the state directly.</li>
</ol>`
      },
      {
        type: "Viva B.4",
        text: `Write examples to differentiate between pure and impure JavaScript functions.`,
        answer: `
<p><strong>Pure Function:</strong> Always returns the same output for the same input and produces no side effects.</p>
<pre><code>// Pure
const add = (a, b) => a + b;</code></pre>

<p><strong>Impure Function:</strong> Relies on external variables, modifies external state, or has side effects (like ` + '`' + `Math.random()` + '`' + ` or ` + '`' + `console.log` + '`' + `).</p>
<pre><code>// Impure
let total = 0;
const addToTotal = (a) => {
  total += a; // Modifies external state
  return total;
};</code></pre>`
      },
      {
        type: "Viva B.5",
        text: `Why dynamic routing is required? How is the path specified and which hook retrieves parameters?`,
        answer: `
<p><strong>Why required:</strong> It allows building routes that can handle dynamic data, like displaying different user profiles or product details using a single component template (e.g., ` + '`' + `/user/123` + '`' + ` vs ` + '`' + `/user/456` + '`' + `).</p>
<p><strong>Path specification:</strong> Uses a colon in the route definition: ` + '`' + `&lt;Route path="/user/:userId" element={&lt;Profile /&gt;} /&gt;` + '`' + `.</p>
<p><strong>Retrieving params:</strong> The ` + '`' + `useParams` + '`' + ` hook from React Router is used (` + '`' + `const { userId } = useParams();` + '`' + `).</p>`
      }
    ]
  },
  {
    id: "set-3",
    title: "Set 3: React Routing, Error Boundaries & Real-World Use Cases",
    questions: [
      {
        type: "Q1",
        text: `Build a Product Store UI application in React using Tailwind CSS and fetch product data from DummyJSON API. Display products in a responsive card layout showing product image, title, price, category, rating, stock availability, and "Add to Cart" button. Use useState and useEffect for data fetching. Display Skeleton UI product cards while fetching. Implement cache memory logic to prevent multiple unnecessary API calls.`,
        answer: `
<pre><code>import React, { useState, useEffect, useRef } from 'react';

const ProductStore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cache = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (cache.current) {
        setProducts(cache.current);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        cache.current = data.products;
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"&gt;
        {[...Array(8)].map((_, i) => (
          &lt;div key={i} className="animate-pulse bg-gray-200 h-80 rounded-xl shadow-md"&gt;&lt;/div&gt;
        ))}
      &lt;/div&gt;
    );
  }

  return (
    &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"&gt;
      {products.map(prod => (
        &lt;div key={prod.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col text-gray-800"&gt;
          &lt;img src={prod.thumbnail} alt={prod.title} className="h-48 w-full object-cover" /&gt;
          &lt;div className="p-4 flex flex-col flex-1"&gt;
            &lt;div className="flex justify-between items-start mb-2 gap-2"&gt;
              &lt;h3 className="font-bold text-lg leading-tight"&gt;{prod.title}&lt;/h3&gt;
              &lt;span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap"&gt;{prod.category}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="text-gray-600 mb-2 flex justify-between items-center"&gt;
              &lt;span className="font-bold text-green-600 text-xl"&gt;$\${prod.price}&lt;/span&gt;
              &lt;span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"&gt;⭐ {prod.rating}&lt;/span&gt;
            &lt;/div&gt;
            &lt;p className={\`text-sm mb-4 font-semibold \${prod.stock &gt; 0 ? 'text-gray-500' : 'text-red-500'}\`}&gt;
              {prod.stock &gt; 0 ? \`In Stock (\${prod.stock})\` : 'Out of Stock'}
            &lt;/p&gt;
            &lt;button 
              className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={prod.stock === 0}
            &gt;
              Add to Cart
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
};

export default ProductStore;</code></pre>`
      },
      {
        type: "Q2",
        text: `Create a Course Dashboard application in React using Tailwind CSS. Display separate components for CourseDetails, VideoLectures, and ProgressTracker. Implement an ErrorBoundary component to catch rendering errors inside the VideoLectures component. Display a reusable fallback UI component when the video API service fails.`,
        answer: `
<p><strong>ErrorBoundary.jsx</strong></p>
<pre><code>import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        &lt;div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded"&gt;
          &lt;h3 className="font-bold"&gt;Video Service Unavailable&lt;/h3&gt;
          &lt;p&gt;We couldn't load the video lectures at this time. Please try again later.&lt;/p&gt;
        &lt;/div&gt;
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;</code></pre>

<p><strong>Dashboard Components (App.jsx)</strong></p>
<pre><code>import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const CourseDetails = () => (
  &lt;div className="bg-white p-6 rounded-lg shadow-md text-gray-800"&gt;
    &lt;h2 className="text-2xl font-bold mb-2"&gt;React Masterclass&lt;/h2&gt;
    &lt;p className="text-gray-600"&gt;Learn advanced React patterns, hooks, and performance optimization.&lt;/p&gt;
  &lt;/div&gt;
);

const VideoLectures = () => {
  // Simulating a component that throws an error when a fake API fails
  const [fail, setFail] = useState(false);
  
  if (fail) {
    throw new Error("Video API failed to load.");
  }

  return (
    &lt;div className="bg-white p-6 rounded-lg shadow-md text-gray-800"&gt;
      &lt;h2 className="text-xl font-bold mb-4"&gt;Video Lectures&lt;/h2&gt;
      &lt;ul className="list-disc pl-5 mb-4"&gt;
        &lt;li&gt;Module 1: Introduction to React&lt;/li&gt;
        &lt;li&gt;Module 2: Advanced Hooks&lt;/li&gt;
        &lt;li&gt;Module 3: Error Boundaries&lt;/li&gt;
      &lt;/ul&gt;
      &lt;button onClick={() => setFail(true)} className="bg-red-500 text-white px-4 py-2 rounded text-sm"&gt;
        Simulate API Failure
      &lt;/button&gt;
    &lt;/div&gt;
  );
};

const ProgressTracker = () => (
  &lt;div className="bg-white p-6 rounded-lg shadow-md text-gray-800"&gt;
    &lt;h2 className="text-xl font-bold mb-2"&gt;Your Progress&lt;/h2&gt;
    &lt;div className="w-full bg-gray-200 rounded-full h-4"&gt;
      &lt;div className="bg-green-500 h-4 rounded-full" style={{ width: '45%' }}&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;p className="mt-2 text-sm text-gray-600"&gt;45% Completed&lt;/p&gt;
  &lt;/div&gt;
);

const CourseDashboard = () => (
  &lt;div className="max-w-4xl mx-auto p-6 space-y-6"&gt;
    &lt;h1 className="text-3xl font-bold text-white mb-6"&gt;Course Dashboard&lt;/h1&gt;
    &lt;CourseDetails /&gt;
    &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-6"&gt;
      &lt;ErrorBoundary&gt;
        &lt;VideoLectures /&gt;
      &lt;/ErrorBoundary&gt;
      &lt;ProgressTracker /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);

export default CourseDashboard;</code></pre>`
      },
      {
        type: "Q3",
        text: `Lifted State: A WhatsApp-like chat application has two components — one for typing a message and another for displaying the live preview. State is managed in the parent and shared via props. Display: total characters entered and remaining characters allowed out of 100. Write a React application using lifted state and derived state`,
        answer: `
<pre><code>import React, { useState } from 'react';

const MAX_CHARS = 100;

const MessageInput = ({ message, onMessageChange }) => (
  &lt;div className="flex flex-col bg-white p-4 rounded-lg shadow-md text-gray-800"&gt;
    &lt;label className="font-bold mb-2"&gt;Type Message:&lt;/label&gt;
    &lt;textarea 
      className="border rounded p-2 w-full h-24 resize-none"
      value={message}
      onChange={(e) => onMessageChange(e.target.value)}
      maxLength={MAX_CHARS}
      placeholder="Type here..."
    /&gt;
  &lt;/div&gt;
);

const LivePreview = ({ message }) => {
  // Derived state: calculated from the 'message' prop directly
  const charCount = message.length;
  const remainingCount = MAX_CHARS - charCount;

  return (
    &lt;div className="bg-green-100 p-4 rounded-lg shadow-md text-gray-800 flex flex-col h-full"&gt;
      &lt;h3 className="font-bold mb-2 text-green-800"&gt;Live Preview&lt;/h3&gt;
      &lt;div className="flex-1 bg-white p-3 rounded border border-green-200 mb-4 whitespace-pre-wrap"&gt;
        {message || &lt;span className="text-gray-400 italic"&gt;Your message will appear here...&lt;/span&gt;}
      &lt;/div&gt;
      &lt;div className="flex justify-between text-sm font-semibold"&gt;
        &lt;span&gt;Characters: {charCount}&lt;/span&gt;
        &lt;span className={remainingCount &lt; 10 ? 'text-red-600' : 'text-gray-600'}&gt;
          Remaining: {remainingCount}
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

const ChatApp = () => {
  const [message, setMessage] = useState('');

  return (
    &lt;div className="max-w-2xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 gap-6"&gt;
      &lt;MessageInput message={message} onMessageChange={setMessage} /&gt;
      &lt;LivePreview message={message} /&gt;
    &lt;/div&gt;
  );
};

export default ChatApp;</code></pre>`
      },
      {
        type: "Q4",
        text: `Testing: Create a React shopping application with ProductList and Cart components. When the user clicks "Add to Cart" in ProductList, the product should appear in Cart and the cart count and total price should update. Write integration test cases using React Testing Library and Jest to test interaction between ProductList and Cart for adding products, updating totals, and handling an empty cart.`,
        answer: `
<p><strong>ShoppingApp.jsx</strong></p>
<pre><code>import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Apple', price: 1.5 },
  { id: 2, name: 'Banana', price: 0.8 }
];

export const ShoppingApp = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    &lt;div&gt;
      &lt;div data-testid="product-list"&gt;
        &lt;h2&gt;Products&lt;/h2&gt;
        {products.map(p => (
          &lt;div key={p.id}&gt;
            &lt;span&gt;{p.name} - $\${p.price}&lt;/span&gt;
            &lt;button data-testid={\`add-btn-\${p.id}\`} onClick={() => addToCart(p)}&gt;Add to Cart&lt;/button&gt;
          &lt;/div&gt;
        ))}
      &lt;/div&gt;

      &lt;div data-testid="cart"&gt;
        &lt;h2&gt;Cart&lt;/h2&gt;
        &lt;p data-testid="cart-count"&gt;Items: {cart.length}&lt;/p&gt;
        {cart.length === 0 ? (
          &lt;p data-testid="empty-msg"&gt;Cart is empty&lt;/p&gt;
        ) : (
          &lt;ul&gt;
            {cart.map((c, i) => &lt;li key={i}&gt;{c.name}&lt;/li&gt;)}
          &lt;/ul&gt;
        )}
        &lt;p data-testid="cart-total"&gt;Total: $\${total.toFixed(2)}&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};</code></pre>

<p><strong>ShoppingApp.test.jsx</strong></p>
<pre><code>import { render, screen, fireEvent } from '@testing-library/react';
import { ShoppingApp } from './ShoppingApp';

describe('Shopping App Integration Test', () => {
  test('handles empty cart initially', () => {
    render(&lt;ShoppingApp /&gt;);
    expect(screen.getByTestId('empty-msg')).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items: 0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $0.00');
  });

  test('adds product to cart and updates total', () => {
    render(&lt;ShoppingApp /&gt;);
    
    // Add Apple ($1.5)
    fireEvent.click(screen.getByTestId('add-btn-1'));
    
    expect(screen.queryByTestId('empty-msg')).not.toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items: 1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $1.50');
    expect(screen.getByText('Apple')).toBeInTheDocument();

    // Add Banana ($0.8)
    fireEvent.click(screen.getByTestId('add-btn-2'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items: 2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $2.30');
  });
});</code></pre>`
      },
      {
        type: "Viva A.1",
        text: `What is the purpose of Skeleton UI while fetching data from an API?`,
        answer: `
<p>A Skeleton UI provides a visual placeholder that mimics the layout of the incoming data while the API fetch is pending. Its purpose is to improve the perceived performance of the app by giving the user immediate feedback that content is loading, reducing user frustration compared to a blank screen or a simple spinner.</p>`
      },
      {
        type: "Viva A.2",
        text: `What is the benefit of having a separate service file for API fetching?`,
        answer: `
<p>Separating API calls into a service file (e.g., ` + '`' + `apiService.js` + '`' + `) promotes <strong>Separation of Concerns</strong>. It keeps React components clean and focused purely on UI logic. It also makes API logic highly reusable across multiple components and easier to mock during testing.</p>`
      },
      {
        type: "Viva A.3",
        text: `Explain the purpose of the useRef hook. Write the steps to get DOM reference and read the text entered by the user in an input element.`,
        answer: `
<p><strong>Purpose:</strong> ` + '`' + `useRef` + '`' + ` is used to persist values across renders without triggering a re-render, and to directly access DOM elements.</p>
<p><strong>Steps to read input text:</strong></p>
<ol>
  <li>Import the hook: ` + '`' + `import { useRef } from 'react';` + '`' + `</li>
  <li>Create the ref: ` + '`' + `const inputRef = useRef(null);` + '`' + `</li>
  <li>Attach to element: ` + '`' + `&lt;input type="text" ref={inputRef} /&gt;` + '`' + `</li>
  <li>Read value on an event (e.g., button click): ` + '`' + `const value = inputRef.current.value;` + '`' + `</li>
</ol>`
      },
      {
        type: "Viva A.4",
        text: `What is Skeleton UI and what is its purpose?`,
        answer: `
<p>A Skeleton UI is a blank, often animated, wireframe version of a component that displays before the actual content has loaded. Its purpose is to enhance the user experience (UX) by keeping the user engaged and indicating exactly where the content will appear, making the application feel faster.</p>`
      },
      {
        type: "Viva A.5",
        text: `Assume an object course with fields courseName, duration, and instructor is passed as props. How to access the received props? Can the child component modify the received props?`,
        answer: `
<p><strong>Accessing props:</strong> You can access them via the props object parameter (e.g., ` + '`' + `props.course.courseName` + '`' + `) or by destructuring directly in the function signature: ` + '`' + `const MyComponent = ({ course }) =&gt; { return &lt;div&gt;{course.courseName}&lt;/div&gt; }` + '`' + `.</p>
<p><strong>Modification:</strong> No. Props are strictly <strong>immutable</strong> (read-only) in React. A child component cannot modify the props it receives. If the data needs to change, the parent must pass down a callback function to update its own state.</p>`
      },
      {
        type: "Viva B.1",
        text: `How does the Container-Presenter pattern help React developers?`,
        answer: `
<p>It separates the data-fetching and state management logic (Container) from the UI rendering logic (Presenter). This helps developers by making components highly reusable, easier to test, and significantly easier to maintain since UI and business logic are decoupled.</p>`
      },
      {
        type: "Viva B.2",
        text: `What is Reconciliation in React?`,
        answer: `
<p>Reconciliation is the algorithm React uses to diff (compare) the newly rendered Virtual DOM tree with the previous Virtual DOM tree. It identifies the exact differences and updates only those changed nodes in the actual browser DOM, ensuring high performance.</p>`
      },
      {
        type: "Viva B.3",
        text: `What happens if no Error Boundary exists in a React application? How is the Error Boundary component helpful?`,
        answer: `
<p><strong>If none exists:</strong> An uncaught JavaScript error in a component's lifecycle or render method will cause the entire React component tree to unmount, leaving the user with a broken, blank screen.</p>
<p><strong>How it's helpful:</strong> An Error Boundary catches these errors in its child components, logs the error, and gracefully degrades the UI by showing a fallback error screen (like "Something went wrong") instead of completely crashing the app.</p>`
      },
      {
        type: "Viva B.4",
        text: `Differentiate between Full Page Load and Single Page Application (SPA).`,
        answer: `
<p><strong>Full Page Load (Traditional):</strong> Every time the user navigates to a new URL, the browser requests a completely new HTML page from the server and re-renders the entire screen from scratch. Slower and consumes more bandwidth.</p>
<p><strong>SPA:</strong> The browser loads a single HTML file initially. Subsequent navigations do not trigger a full page reload; instead, JavaScript fetches only the necessary data and dynamically rewrites the current page's DOM. Much faster and provides a seamless, app-like experience.</p>`
      },
      {
        type: "Viva B.5",
        text: `Write the commands to: Create a React application and Run the local development server`,
        answer: `
<p>Using Vite (Modern standard):</p>
<ul>
  <li><strong>Create:</strong> ` + '`' + `npm create vite@latest my-app -- --template react` + '`' + `</li>
  <li><strong>Run:</strong> ` + '`' + `cd my-app && npm install && npm run dev` + '`' + `</li>
</ul>
<p>Using Create React App (Legacy):</p>
<ul>
  <li><strong>Create:</strong> ` + '`' + `npx create-react-app my-app` + '`' + `</li>
  <li><strong>Run:</strong> ` + '`' + `cd my-app && npm start` + '`' + `</li>
</ul>`
      }
    ]
  },
  {
    id: "set-4",
    title: "Set 4: Forms, Routing, Theming & TypeScript",
    questions: [
      {
        type: "Q1",
        text: `Create a Payroll Calculator application in React using functional components and useState. Create input fields for Employee Name, Basic Pay, DA%, and HRA%. Assume PF = 10% of Basic Pay and Tax = 5% of Gross Salary. Take state variable as object. Use onClick buttons to calculate Gross Salary, Tax Amount, Total Deductions, and Net Salary. Display all calculated values dynamically. Do validation for all input fields.`,
        answer: `
<pre><code>import React, { useState } from 'react';

const PayrollCalculator = () => {
  const [inputs, setInputs] = useState({ name: '', basic: '', da: '', hra: '' });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculatePayroll = () => {
    const { name, basic, da, hra } = inputs;
    if (!name || !basic || !da || !hra) {
      setError('All fields are required!');
      return;
    }
    
    const basicPay = parseFloat(basic);
    const daPercent = parseFloat(da);
    const hraPercent = parseFloat(hra);

    if (isNaN(basicPay) || isNaN(daPercent) || isNaN(hraPercent)) {
      setError('Numeric fields must contain valid numbers.');
      return;
    }

    setError('');
    
    const daAmount = (basicPay * daPercent) / 100;
    const hraAmount = (basicPay * hraPercent) / 100;
    const grossSalary = basicPay + daAmount + hraAmount;
    
    const pf = (basicPay * 10) / 100;
    const tax = (grossSalary * 5) / 100;
    const totalDeductions = pf + tax;
    const netSalary = grossSalary - totalDeductions;

    setResults({
      name, grossSalary, tax, totalDeductions, netSalary
    });
  };

  return (
    &lt;div className="max-w-md mx-auto p-6 bg-white rounded shadow text-gray-800"&gt;
      &lt;h2 className="text-xl font-bold mb-4"&gt;Payroll Calculator&lt;/h2&gt;
      {error && &lt;p className="text-red-500 mb-2"&gt;{error}&lt;/p&gt;}
      
      &lt;div className="space-y-3"&gt;
        &lt;input name="name" placeholder="Employee Name" onChange={handleChange} className="border p-2 w-full" /&gt;
        &lt;input name="basic" placeholder="Basic Pay" onChange={handleChange} className="border p-2 w-full" /&gt;
        &lt;input name="da" placeholder="DA %" onChange={handleChange} className="border p-2 w-full" /&gt;
        &lt;input name="hra" placeholder="HRA %" onChange={handleChange} className="border p-2 w-full" /&gt;
        &lt;button onClick={calculatePayroll} className="bg-blue-600 text-white w-full py-2 rounded"&gt;Calculate&lt;/button&gt;
      &lt;/div&gt;

      {results && (
        &lt;div className="mt-6 p-4 bg-gray-100 rounded"&gt;
          &lt;h3 className="font-bold border-b pb-2 mb-2"&gt;Results for {results.name}&lt;/h3&gt;
          &lt;p&gt;Gross Salary: $\${results.grossSalary.toFixed(2)}&lt;/p&gt;
          &lt;p&gt;Tax (5%): $\${results.tax.toFixed(2)}&lt;/p&gt;
          &lt;p&gt;Total Deductions: $\${results.totalDeductions.toFixed(2)}&lt;/p&gt;
          &lt;p className="font-bold text-green-600 mt-2"&gt;Net Salary: $\${results.netSalary.toFixed(2)}&lt;/p&gt;
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
};

export default PayrollCalculator;</code></pre>`
      },
      {
        type: "Q2",
        text: `Create a Theme Toggle application in React using functional components and useState. Create a button to switch between Light Theme and Dark Theme dynamically. Use localStorage to save the selected theme and useEffect to load the stored theme on start. Apply conditional rendering and dynamic class names to change the application theme UI.`,
        answer: `
<pre><code>import React, { useState, useEffect } from 'react';

const ThemeApp = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const isDark = theme === 'dark';

  return (
    &lt;div className={\`min-h-screen p-8 transition-colors duration-300 \${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}\`}&gt;
      &lt;div className={\`max-w-xl mx-auto p-6 rounded-lg shadow-lg \${isDark ? 'bg-gray-800' : 'bg-white'}\`}&gt;
        &lt;h1 className="text-3xl font-bold mb-4"&gt;
          {isDark ? 'Dark Theme' : 'Light Theme'}
        &lt;/h1&gt;
        &lt;p className="mb-6"&gt;
          This app dynamically switches themes and saves your preference to localStorage!
        &lt;/p&gt;
        &lt;button 
          onClick={toggleTheme} 
          className={\`px-6 py-2 rounded font-bold transition \${isDark ? 'bg-yellow-400 text-gray-900' : 'bg-indigo-600 text-white'}\`}
        &gt;
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default ThemeApp;</code></pre>`
      },
      {
        type: "Q3",
        text: `Testing: Create a React search application with SearchBar and ResultsList components. When the user types in SearchBar, ResultsList should display only matching items. If no matching items found, display "No results found". Write integration test cases using React Testing Library and Jest to test interaction between SearchBar and ResultsList.`,
        answer: `
<p><strong>SearchApp.jsx</strong></p>
<pre><code>import React, { useState } from 'react';

const items = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];

const SearchBar = ({ onSearch }) => (
  &lt;input 
    type="text" 
    placeholder="Search..." 
    data-testid="search-input"
    onChange={(e) => onSearch(e.target.value)}
  /&gt;
);

const ResultsList = ({ query }) => {
  const filtered = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  
  if (filtered.length === 0) {
    return &lt;p data-testid="no-results"&gt;No results found&lt;/p&gt;;
  }
  
  return (
    &lt;ul data-testid="results-list"&gt;
      {filtered.map(item => &lt;li key={item}&gt;{item}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
};

export const SearchApp = () => {
  const [query, setQuery] = useState('');
  return (
    &lt;div&gt;
      &lt;SearchBar onSearch={setQuery} /&gt;
      &lt;ResultsList query={query} /&gt;
    &lt;/div&gt;
  );
};</code></pre>

<p><strong>SearchApp.test.jsx</strong></p>
<pre><code>import { render, screen, fireEvent } from '@testing-library/react';
import { SearchApp } from './SearchApp';

describe('SearchApp Integration Test', () => {
  test('displays all items initially', () => {
    render(&lt;SearchApp /&gt;);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Mango')).toBeInTheDocument();
  });

  test('filters items based on search query', () => {
    render(&lt;SearchApp /&gt;);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'an' } });
    
    // Banana, Orange, Mango contain 'an'
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Orange')).toBeInTheDocument();
    expect(screen.getByText('Mango')).toBeInTheDocument();
    
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  test('displays no results message when nothing matches', () => {
    render(&lt;SearchApp /&gt;);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Zebra' } });
    
    expect(screen.getByTestId('no-results')).toHaveTextContent('No results found');
    expect(screen.queryByTestId('results-list')).not.toBeInTheDocument();
  });
});</code></pre>`
      },
      {
        type: "Q4",
        text: `Routing: Create a student portal website using React Router DOM with Home, Login, Courses, and Dashboard pages. When a student selects a course, open the Course Details page based on course ID in the URL. Inside Dashboard, Marks and Attendance pages should render within the Dashboard. Only logged-in users can access Dashboard pages; otherwise redirect to Login. Display a Page Not Found page for invalid URLs.`,
        answer: `
<pre><code>import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams, Outlet } from 'react-router-dom';

const Home = () => &lt;h2&gt;Home Page&lt;/h2&gt;;
const Login = ({ setAuth }) => &lt;button onClick={() => setAuth(true)}&gt;Login&lt;/button&gt;;
const NotFound = () => &lt;h2&gt;404 Page Not Found&lt;/h2&gt;;

const Courses = () => (
  &lt;div&gt;
    &lt;h2&gt;Courses&lt;/h2&gt;
    &lt;Link to="/course/101"&gt;React Course (101)&lt;/Link&gt; | 
    &lt;Link to="/course/102"&gt;NodeJS Course (102)&lt;/Link&gt;
  &lt;/div&gt;
);

const CourseDetails = () => {
  const { id } = useParams();
  return &lt;h2&gt;Details for Course ID: {id}&lt;/h2&gt;;
};

const Dashboard = () => (
  &lt;div&gt;
    &lt;h2&gt;Dashboard&lt;/h2&gt;
    &lt;nav&gt;
      &lt;Link to="marks"&gt;Marks&lt;/Link&gt; | &lt;Link to="attendance"&gt;Attendance&lt;/Link&gt;
    &lt;/nav&gt;
    &lt;hr /&gt;
    &lt;Outlet /&gt; {/* Renders nested routes here */}
  &lt;/div&gt;
);

const Marks = () => &lt;h3&gt;Your Marks: 95%&lt;/h3&gt;;
const Attendance = () => &lt;h3&gt;Your Attendance: 88%&lt;/h3&gt;;

const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) return &lt;Navigate to="/login" replace /&gt;;
  return children;
};

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    &lt;BrowserRouter&gt;
      &lt;nav style={{ padding: '10px', background: '#eee' }}&gt;
        &lt;Link to="/"&gt;Home&lt;/Link&gt; | &lt;Link to="/courses"&gt;Courses&lt;/Link&gt; | 
        &lt;Link to="/dashboard"&gt;Dashboard&lt;/Link&gt;
      &lt;/nav&gt;
      
      &lt;div style={{ padding: '20px' }}&gt;
        &lt;Routes&gt;
          &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
          &lt;Route path="/login" element={&lt;Login setAuth={setIsAuth} /&gt;} /&gt;
          &lt;Route path="/courses" element={&lt;Courses /&gt;} /&gt;
          &lt;Route path="/course/:id" element={&lt;CourseDetails /&gt;} /&gt;
          
          {/* Protected Route with Nested Routes */}
          &lt;Route path="/dashboard" element={&lt;ProtectedRoute isAuth={isAuth}&gt;&lt;Dashboard /&gt;&lt;/ProtectedRoute&gt;}&gt;
            &lt;Route path="marks" element={&lt;Marks /&gt;} /&gt;
            &lt;Route path="attendance" element={&lt;Attendance /&gt;} /&gt;
          &lt;/Route&gt;
          
          &lt;Route path="*" element={&lt;NotFound /&gt;} /&gt;
        &lt;/Routes&gt;
      &lt;/div&gt;
    &lt;/BrowserRouter&gt;
  );
};

export default App;</code></pre>`
      },
      {
        type: "Viva A.1",
        text: `When do you prefer CSS Modules over Global CSS? What are the benefits of CSS Modules? Write the steps to create and use a CSS Module.`,
        answer: `
<p><strong>Preference:</strong> CSS Modules are preferred in component-based frameworks like React to avoid global scope pollution and class name collisions, ensuring styles only apply to the component that imports them.</p>
<p><strong>Benefits:</strong> Locally scoped by default, no naming conflicts (automatically generates unique class names), highly maintainable.</p>
<p><strong>Steps:</strong></p>
<ol>
  <li>Create a file named with \`.module.css\` extension (e.g., \`Button.module.css\`).</li>
  <li>Write standard CSS classes inside it: \`.btn { color: red; }\`.</li>
  <li>Import in React component: \`import styles from './Button.module.css';\`.</li>
  <li>Apply class: \`&lt;button className={styles.btn}&gt;Click&lt;/button&gt;\`.</li>
</ol>`
      },
      {
        type: "Viva A.2",
        text: `Write the syntax for creating a function-based React component with default export and relevant import statement.`,
        answer: `
<pre><code>import React from 'react';

const MyComponent = () => {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;/div&gt;
  );
};

export default MyComponent;</code></pre>
<p>To import it in another file:</p>
<pre><code>import MyComponent from './MyComponent';</code></pre>`
      },
      {
        type: "Viva A.3",
        text: `How do you decide between Controlled Components and Uncontrolled Components?`,
        answer: `
<p><strong>Controlled Components (React State controls data):</strong> Use when you need instant input validation, conditionally disabling buttons based on form state, enforcing input formats, or relying on the form data for dynamic UI updates.</p>
<p><strong>Uncontrolled Components (DOM controls data using Refs):</strong> Use when migrating legacy code, integrating with non-React libraries (like jQuery), or for quick, simple forms where you only need the data once upon form submission.</p>`
      },
      {
        type: "Viva A.4",
        text: `If you style a card component (Profile/Course/FoodItem/Product Card), what styles are generally applied to make the UI look like a card?`,
        answer: `
<p>Common card styles include:</p>
<ul>
  <li><strong>Background:</strong> Usually white or off-white against a darker background.</li>
  <li><strong>Border Radius:</strong> Rounded corners (\`border-radius: 8px\`).</li>
  <li><strong>Box Shadow:</strong> A subtle shadow (\`box-shadow: 0 4px 6px rgba(0,0,0,0.1)\`) to lift it off the background.</li>
  <li><strong>Padding & Margin:</strong> Padding inside the card to keep content away from edges, margin outside to separate multiple cards.</li>
  <li><strong>Overflow:</strong> \`overflow: hidden\` to ensure images don't break the rounded corners.</li>
</ul>`
      },
      {
        type: "Viva A.5",
        text: `What is the reason behind maintaining closure memory in JavaScript`,
        answer: `
<p>Closure memory is maintained so that an inner function always has access to the variables and parameters of its outer lexical scope, <em>even after</em> the outer function has finished executing. This is essential for data privacy/encapsulation (like private variables), event handlers, setTimeout callbacks, and functional React components holding onto their specific render state.</p>`
      },
      {
        type: "Viva B.1",
        text: `Explain optional fields in a TypeScript object structure. What pre-check should be done before accessing an optional field?`,
        answer: `
<p><strong>Optional fields</strong> are properties that may or may not be present in an object. They are defined using a question mark (\`?\`) in an interface or type (e.g., \`age?: number;\`).</p>
<p><strong>Pre-check:</strong> Before accessing or performing operations on an optional field, you must check if it is \`undefined\` using optional chaining (\`user?.age\`) or conditional checks (\`if (user.age !== undefined)\`) to prevent runtime errors.</p>`
      },
      {
        type: "Viva B.2",
        text: `How does the Component Composition pattern help React developers? Justify the reason behind creating multiple components instead of a single component.`,
        answer: `
<p><strong>Component Composition</strong> is assembling complex UIs by combining smaller, independent components (passing them via \`props.children\` or dedicated props). It prevents "prop drilling" and makes components highly reusable and generic.</p>
<p><strong>Reason for multiple components:</strong> Creating a single giant component violates the Single Responsibility Principle. Smaller components are easier to read, test, maintain, and reuse across different parts of the application.</p>`
      },
      {
        type: "Viva B.3",
        text: `Write productService.js using Promise Chaining with proper error handling to fetch data from: https://dummyjson.com/products`,
        answer: `
<pre><code>// productService.js
export const fetchProducts = () => {
  return fetch('https://dummyjson.com/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      return response.json();
    })
    .then((data) => {
      return data.products;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error;
    });
};</code></pre>`
      },
      {
        type: "Viva B.4",
        text: `Explain Union Types and Union Values in TypeScript with example. What pre-check should be done before applying type-specific operations?`,
        answer: `
<p><strong>Union Types</strong> allow a variable to hold values of multiple distinct types, separated by a pipe (\`|\`).</p>
<pre><code>let identifier: string | number;
identifier = 101; // Valid
identifier = "user_A"; // Valid</code></pre>
<p><strong>Pre-check (Type Guard):</strong> Before applying type-specific operations (like \`.toUpperCase()\`), you must narrow the type using \`typeof\` or \`instanceof\`.</p>
<pre><code>if (typeof identifier === "string") {
  console.log(identifier.toUpperCase());
}</code></pre>`
      },
      {
        type: "Viva B.5",
        text: `Explain the purpose of the useRef hook in a real-world scenario.`,
        answer: `
<p>In a real-world scenario, \`useRef\` is heavily used for:</p>
<ol>
  <li><strong>Direct DOM manipulation:</strong> Setting focus on an input field automatically when a modal opens, or scrolling to a specific chat message.</li>
  <li><strong>Storing mutable values without re-rendering:</strong> Keeping track of an interval ID (for a stopwatch) or a previous state value so you can compare it during the next render cycle, without triggering an infinite re-render loop.</li>
</ol>`
      }
    ]
  },
  {
    id: "set-5",
    title: "Set 5: State Management, Routing & Testing Concepts",
    questions: [
      {
        type: "Q1",
        text: `Create a Todo List application in React using useState[]. Create an input field and buttons to add and remove tasks. Use Tailwind CSS for styling. Use localStorage to store tasks and useEffect to load stored tasks on start. Display an empty message when no tasks are available and prevent empty task submission.`,
        answer: `
<pre><code>import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    &lt;div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl text-gray-800"&gt;
      &lt;h2 className="text-2xl font-bold mb-4 text-center text-indigo-600"&gt;Todo List&lt;/h2&gt;
      
      &lt;div className="flex gap-2 mb-4"&gt;
        &lt;input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..." 
          className="flex-1 border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
        /&gt;
        &lt;button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold transition"&gt;
          Add
        &lt;/button&gt;
      &lt;/div&gt;

      {tasks.length === 0 ? (
        &lt;p className="text-center text-gray-500 italic mt-4"&gt;No tasks available. Add some!&lt;/p&gt;
      ) : (
        &lt;ul className="space-y-2"&gt;
          {tasks.map(task => (
            &lt;li key={task.id} className="flex justify-between items-center bg-gray-100 p-3 rounded"&gt;
              &lt;span&gt;{task.text}&lt;/span&gt;
              &lt;button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-700 font-bold"&gt;
                ✕
              &lt;/button&gt;
            &lt;/li&gt;
          ))}
        &lt;/ul&gt;
      )}
    &lt;/div&gt;
  );
};

export default TodoList;</code></pre>`
      },
      {
        type: "Q2",
        text: `Create a Book Card application in React using functional components and useState. Store book title, price, discount percentage, and stock quantity inside an object state variable in App and pass as props to BookCard. Create buttons to Apply Discount and Toggle Favorite. Use conditional rendering to show "Out of Stock" if quantity is 0, otherwise show "Buy Now" button.`,
        answer: `
<pre><code>import React, { useState } from 'react';

const BookCard = ({ book, onApplyDiscount, onToggleFavorite }) => {
  const discountedPrice = book.price - (book.price * book.discount / 100);

  return (
    &lt;div className="border border-gray-300 p-6 rounded-xl shadow-lg max-w-sm bg-white text-gray-800"&gt;
      &lt;h3 className="text-2xl font-bold mb-2 text-indigo-700"&gt;{book.title}&lt;/h3&gt;
      
      &lt;div className="mb-4 text-lg"&gt;
        &lt;span className="line-through text-gray-500 mr-2"&gt;$\${book.price}&lt;/span&gt;
        &lt;span className="text-green-600 font-bold"&gt;$\${discountedPrice.toFixed(2)}&lt;/span&gt;
      &lt;/div&gt;

      &lt;div className="flex gap-2 mb-6"&gt;
        &lt;button onClick={onApplyDiscount} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 rounded transition"&gt;
          Apply 20% Discount
        &lt;/button&gt;
        &lt;button onClick={onToggleFavorite} className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold py-2 rounded transition border border-pink-300"&gt;
          {book.isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
        &lt;/button&gt;
      &lt;/div&gt;

      &lt;div&gt;
        {book.stock === 0 ? (
          &lt;div className="bg-red-100 text-red-700 text-center font-bold py-3 rounded"&gt;Out of Stock&lt;/div&gt;
        ) : (
          &lt;button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded transition"&gt;
            Buy Now
          &lt;/button&gt;
        )}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

const App = () => {
  const [book, setBook] = useState({
    title: 'The React Handbook',
    price: 45.00,
    discount: 0,
    stock: 5,
    isFavorite: false
  });

  const handleApplyDiscount = () => {
    setBook(prev => ({ ...prev, discount: 20 }));
  };

  const handleToggleFavorite = () => {
    setBook(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  return (
    &lt;div className="min-h-screen flex items-center justify-center bg-gray-50 p-4"&gt;
      &lt;BookCard 
        book={book} 
        onApplyDiscount={handleApplyDiscount} 
        onToggleFavorite={handleToggleFavorite} 
      /&gt;
    &lt;/div&gt;
  );
};

export default App;</code></pre>`
      },
      {
        type: "Q3",
        text: `Testing: Create a React Product Card component with a Wishlist button. When clicked, the product should be added to or removed from the wishlist, the heart icon should change, and a message should display. Write unit test cases using React Testing Library and Jest to test the initial button state, button toggle behavior, and wishlist messages.`,
        answer: `
<p><strong>ProductCard.jsx</strong></p>
<pre><code>import React, { useState } from 'react';

export const ProductCard = () => {
  const [inWishlist, setInWishlist] = useState(false);

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  return (
    &lt;div&gt;
      &lt;h3&gt;Awesome Gadget&lt;/h3&gt;
      &lt;button onClick={toggleWishlist} data-testid="wishlist-btn"&gt;
        {inWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
      &lt;/button&gt;
      &lt;p data-testid="status-message"&gt;
        {inWishlist ? 'Item is in your wishlist' : 'Item is not in your wishlist'}
      &lt;/p&gt;
    &lt;/div&gt;
  );
};</code></pre>

<p><strong>ProductCard.test.jsx</strong></p>
<pre><code>import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard Component', () => {
  test('initial state is correct', () => {
    render(&lt;ProductCard /&gt;);
    expect(screen.getByTestId('wishlist-btn')).toHaveTextContent('🤍 Add to Wishlist');
    expect(screen.getByTestId('status-message')).toHaveTextContent('Item is not in your wishlist');
  });

  test('toggles to wishlist added state', () => {
    render(&lt;ProductCard /&gt;);
    const btn = screen.getByTestId('wishlist-btn');
    
    fireEvent.click(btn);
    
    expect(btn).toHaveTextContent('❤️ Remove from Wishlist');
    expect(screen.getByTestId('status-message')).toHaveTextContent('Item is in your wishlist');
  });

  test('toggles back to removed state', () => {
    render(&lt;ProductCard /&gt;);
    const btn = screen.getByTestId('wishlist-btn');
    
    fireEvent.click(btn); // Add
    fireEvent.click(btn); // Remove
    
    expect(btn).toHaveTextContent('🤍 Add to Wishlist');
    expect(screen.getByTestId('status-message')).toHaveTextContent('Item is not in your wishlist');
  });
});</code></pre>`
      },
      {
        type: "Q4",
        text: `Routing: Create a blog website using React Router DOM with Home, About, Blog, Login, and Dashboard pages. When a user selects a blog post, open the Blog Details page based on blog ID in URL. Inside each blog page, Comments and Related Posts should render within the same page. Dashboard should contain Profile and Settings pages. Only logged-in users can access Dashboard; otherwise redirect to Login. Display Page Not Found for invalid URLs`,
        answer: `
<pre><code>import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams, Outlet } from 'react-router-dom';

const Home = () => &lt;h2&gt;Home&lt;/h2&gt;;
const About = () => &lt;h2&gt;About&lt;/h2&gt;;
const Login = ({ setAuth }) => &lt;button onClick={() => setAuth(true)}&gt;Log In&lt;/button&gt;;
const NotFound = () => &lt;h2&gt;404 Page Not Found&lt;/h2&gt;;

const Blog = () => (
  &lt;div&gt;
    &lt;h2&gt;Blog Posts&lt;/h2&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;Link to="/blog/1"&gt;Post 1: React Basics&lt;/Link&gt;&lt;/li&gt;
      &lt;li&gt;&lt;Link to="/blog/2"&gt;Post 2: Routing&lt;/Link&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
);

const BlogDetails = () => {
  const { id } = useParams();
  return (
    &lt;div&gt;
      &lt;h2&gt;Blog Post #{id}&lt;/h2&gt;
      &lt;p&gt;Full content for post {id}...&lt;/p&gt;
      
      {/* Nested components that render inside the same page */}
      &lt;Comments postId={id} /&gt;
      &lt;RelatedPosts postId={id} /&gt;
    &lt;/div&gt;
  );
};

const Comments = ({ postId }) => &lt;h4&gt;Comments for post {postId}: Great read!&lt;/h4&gt;;
const RelatedPosts = ({ postId }) => &lt;h4&gt;Related to post {postId}: More posts...&lt;/h4&gt;;

const Dashboard = () => (
  &lt;div&gt;
    &lt;h2&gt;User Dashboard&lt;/h2&gt;
    &lt;nav&gt;&lt;Link to="profile"&gt;Profile&lt;/Link&gt; | &lt;Link to="settings"&gt;Settings&lt;/Link&gt;&lt;/nav&gt;
    &lt;hr/&gt;
    &lt;Outlet /&gt;
  &lt;/div&gt;
);

const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) return &lt;Navigate to="/login" replace /&gt;;
  return children;
};

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    &lt;BrowserRouter&gt;
      &lt;nav style={{ padding: '10px', background: '#ccc' }}&gt;
        &lt;Link to="/"&gt;Home&lt;/Link&gt; | &lt;Link to="/about"&gt;About&lt;/Link&gt; | 
        &lt;Link to="/blog"&gt;Blog&lt;/Link&gt; | &lt;Link to="/dashboard"&gt;Dashboard&lt;/Link&gt;
      &lt;/nav&gt;
      
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
        &lt;Route path="/blog" element={&lt;Blog /&gt;} /&gt;
        &lt;Route path="/blog/:id" element={&lt;BlogDetails /&gt;} /&gt;
        &lt;Route path="/login" element={&lt;Login setAuth={setIsAuth} /&gt;} /&gt;
        
        &lt;Route path="/dashboard" element={&lt;ProtectedRoute isAuth={isAuth}&gt;&lt;Dashboard /&gt;&lt;/ProtectedRoute&gt;}&gt;
          &lt;Route path="profile" element={&lt;h3&gt;Profile&lt;/h3&gt;} /&gt;
          &lt;Route path="settings" element={&lt;h3&gt;Settings&lt;/h3&gt;} /&gt;
        &lt;/Route&gt;
        
        &lt;Route path="*" element={&lt;NotFound /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  );
};

export default App;</code></pre>`
      },
      {
        type: "Viva A.1",
        text: `What is the stale state problem in React? How can it be avoided? Explain with a useEffect example.`,
        answer: `
<p><strong>Stale State Problem:</strong> Occurs when a closure (like a \`useEffect\` callback or an event handler) "captures" a state variable from an old render, meaning it references an outdated value instead of the current one.</p>
<p><strong>How to avoid it:</strong> Use functional state updates (\`setCount(prev =&gt; prev + 1)\`) or ensure the state variable is correctly listed in the dependency array.</p>
<p><strong>Example:</strong></p>
<pre><code>// Bad: Stale state
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1); // 'count' is captured from initial render (always 0)
  }, 1000);
  return () => clearInterval(timer);
}, []); // Empty array causes stale closure

// Good: Functional update
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prevCount => prevCount + 1); // Always gets the latest state
  }, 1000);
  return () => clearInterval(timer);
}, []);</code></pre>`
      },
      {
        type: "Viva A.2",
        text: `Explain race condition in the context of a search API endpoint. How can it be resolved using cleanup functions?`,
        answer: `
<p><strong>Race Condition:</strong> If you type "A" and then "AB", two API requests fire. If "AB" completes <em>before</em> "A" (due to network latency), the results for "A" will overwrite "AB", showing the wrong results on screen.</p>
<p><strong>Resolution:</strong> Use a cleanup function in \`useEffect\` to set an \`ignore\` or \`isActive\` boolean flag, or abort the fetch request.</p>
<pre><code>useEffect(() => {
  let isActive = true;
  fetchData(query).then(data => {
    if (isActive) setResults(data); // Only update state if this is still the active request
  });
  return () => {
    isActive = false; // Marks previous request as stale when query changes
  };
}, [query]);</code></pre>`
      },
      {
        type: "Viva A.3",
        text: `Write the syntax for creating a function-based React component with default export. What is the relevant import statement?`,
        answer: `
<p><strong>Creation:</strong></p>
<pre><code>import React from 'react';

const Header = () => {
  return &lt;header&gt;Website Header&lt;/header&gt;;
};

export default Header;</code></pre>

<p><strong>Import Statement:</strong></p>
<pre><code>import Header from './Header';</code></pre>`
      },
      {
        type: "Viva A.4",
        text: `Explain optional fields in a TypeScript object structure. What pre-check should be done before accessing an optional field?`,
        answer: `
<p><strong>Optional fields</strong> are properties that are not guaranteed to exist on an object, marked with a \`?\` in the type definition (e.g., \`phoneNumber?: string\`).</p>
<p><strong>Pre-check:</strong> Because the value can be \`undefined\`, you must use optional chaining (\`user?.phoneNumber\`) or explicit checks (\`if (user.phoneNumber)\`) before performing operations on the field to prevent runtime "Cannot read properties of undefined" errors.</p>`
      },
      {
        type: "Viva A.5",
        text: `How does the Container-Presenter pattern help React developers? Justify the reason behind creating multiple components.`,
        answer: `
<p><strong>How it helps:</strong> It cleanly separates concerns. The Container component handles all logic, data fetching, and state management, while the Presenter component purely handles UI rendering based on props.</p>
<p><strong>Reason for multiple components:</strong> This makes code significantly more maintainable. Presenters become highly reusable across different parts of the app (because they are dumb to business logic), and Containers are much easier to test and modify without worrying about breaking the UI layout.</p>`
      },
      {
        type: "Viva B.1",
        text: `What is the purpose of an Error Boundary? What happens if no Error Boundary exists in a React application? How can it be implemented?`,
        answer: `
<p><strong>Purpose:</strong> To catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app.</p>
<p><strong>If none exists:</strong> An error thrown in a component will cause the entire React tree to unmount, resulting in a blank, broken screen for the user.</p>
<p><strong>Implementation:</strong> It must be implemented as a Class Component that defines either \`static getDerivedStateFromError(error)\` (to render fallback UI) or \`componentDidCatch(error, errorInfo)\` (to log errors).</p>`
      },
      {
        type: "Viva B.2",
        text: `Differentiate between Full Page Load and Single Page Application (SPA). Why is routing required and which library supports it?`,
        answer: `
<p><strong>Full Page Load:</strong> The browser requests a brand new HTML page from the server for every navigation action, causing the entire screen to flash and reload.</p>
<p><strong>SPA:</strong> The browser loads one initial HTML document. Navigation actions are intercepted by JavaScript, which dynamically swaps out DOM elements without fully reloading the page, creating a faster, app-like feel.</p>
<p><strong>Why routing is required / Library:</strong> Routing maps URLs (like \`/about\`) to specific React components so users can use the back button, bookmark pages, and navigate the SPA. The standard library is <strong>\`react-router-dom\`</strong>.</p>`
      },
      {
        type: "Viva B.3",
        text: `What is prop drilling? Explain how Context API solves the prop drilling problem with steps to implement it.`,
        answer: `
<p><strong>Prop Drilling:</strong> The painful process of passing data down through many layers of components that do not need the data themselves, just to reach a deeply nested child.</p>
<p><strong>How Context API solves it:</strong> It allows you to "teleport" data directly to the components that need it, completely bypassing intermediate components.</p>
<p><strong>Steps:</strong></p>
<ol>
  <li>Create: \`const ThemeContext = createContext();\`</li>
  <li>Provide: \`&lt;ThemeContext.Provider value={theme}&gt; {children} &lt;/ThemeContext.Provider&gt;\`</li>
  <li>Consume: \`const theme = useContext(ThemeContext);\` in any child component.</li>
</ol>`
      },
      {
        type: "Viva B.4",
        text: `Explain Union Types in TypeScript with an example. What pre-check should be done before applying type-specific operations?`,
        answer: `
<p><strong>Union Types</strong> define a type that can be one of several types, using the pipe (\`|\`) symbol.</p>
<pre><code>let status: string | number;
status = "active";
status = 200;</code></pre>
<p><strong>Pre-check:</strong> You must perform "Type Narrowing" (Type Guards) using \`typeof\` before doing specific operations. For example, you can't use \`.toLowerCase()\` on \`status\` unless you first check \`if (typeof status === "string")\`.</p>`
      },
      {
        type: "Viva B.5",
        text: `Why do we perform testing? Differentiate between unit testing and integration testing with examples.`,
        answer: `
<p><strong>Why test:</strong> To ensure code functions as intended, prevent future regressions when refactoring, and improve overall software reliability.</p>
<p><strong>Unit Testing:</strong> Tests an isolated, individual piece of code (like a single function or a simple UI component).<br>
<em>Example:</em> Testing if a \`formatDate(dateString)\` function returns the correct format.</p>
<p><strong>Integration Testing:</strong> Tests how multiple units/components work <em>together</em>.<br>
<em>Example:</em> Testing if clicking an "Add to Cart" button inside a \`ProductCard\` component correctly updates the total counter in a separate \`Header\` component.</p>`
      }
    ]
  }
];
