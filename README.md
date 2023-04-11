# React Admin Panel

Admin panel with reactJS and Ant Design V5 ui library. This project aim at using a minimalist library usage and maximalize important library.

## Preinstalled dependencies
- antd 5.1.6
- axios 1.3.2
- dayjs 1.11.7
- react-icons 4.7.1
- react-router-dom 6.8.0
- react-country-flag 3.0.2
- @tanstack/react-query 4.24.10
- apexcharts 3.37.1
- lodash.debounce 4.0.8
- env-cmd 10.1.0

## Installation
1. Clone this github repo
2. Inside this folder, open terminal and run `npm install` or `npm install --legacy-peer-deps` if the first run is not successfully
3. Then run `npm start`.
    - Running in production mode, where all authorization will not be save in any browser storage, and use htp only cookie
4. Or run `npm run dev`
    - To run in production mode, with all authorization saved in local storage 

## Customizing theme
Based on this doc https://ant.design/docs/react/customize-theme, so i provide a theme token @ `src\themeToken.js`.  You can change the token that suits your design.  For token list, you can follow the doc, or you can play along with theme @ https://ant.design/theme-editor.  In case you need an individual component outside `themeToken.js`, you can also create it by following one of my custom component @ `src\Component\ButtonInfo.js`

## Routing and Create New Page
In this project, routing using react-router-dom V6.  Combine with antd layout for the sidebar, so you don't need to do extra to create a new page, here is how to make a new page

1. Create a new Component / Page
    - First create a page, that you need to export it in `index.js`, in this case all the pages are a Demo pages so my index.js file is @ `src\Pages\Demo\index.js`.

2. Register your newly created page
    - Open up `src\Routes\RouteRegistry.js`, then import your new Page like
    ```javascript
    import { 
        DemoDashboard,
        SimpleOperation,
        ...
    } from "../Pages/Demo";
    ```

3. Register new sidebar menu with your new page
    - Still on `src\Routes\RouteRegistry.js`, below there is a `sidebarRouteList`, this is a registry for antd layout also for breadcrumb, then insert your new page there by following what already exist object.

4. Other page that doesn't need a side bar menu
    - For example, you need to create a page to view detail from a particular data, or you need a form outside modal.  First follow from step 1, then on step 3, you need to register your page @ `otherRouteList` below `sidebarRouteList`.

## Authentication
This project authentication implement refresh token as `http only cookie` and access token.  Access token used for performing any request to a server after user login, refresh token used for generating new access token if it is expired.  I use 2 options to save access token, first using a `context`, also there is a way to genarate access token in case user refresh the page.  The second one is using local storage.  Because from my opinion saving access token in localstorage is not save, so i use context first, and if you need to use local storage to save access token i suggest you to encrypt the token using `securels`, you can read the full doc @ https://www.npmjs.com/package/secure-ls.  You can use access token as context by running `npm start` and for access token as local storage, you can run `npm run dev`.
    
## Data Fetching and Mutating
In this project, data fetching are using `axios` and `react-query` library, you can use or modify them as you need just by following their documentation, but here i will explain how to use this project data fetching setup.

1. Fetch Function
    - Axios isntance `src/_services/request.js`
        - Contain a function to create axios instance also an interceptors. There are 3 axios instance and also interceptors custom hook.  Interceptor custom hook called       inside `src/Routes/ProtectedRoute.js` file to automatically run interceptor when any request made.
    
    - Fetch function `src/_services/http/`
        - All fetch function inside `http` folder.  Example if you need to create, read, update and delete from `medicines` services, first create a file name like             `medicinesServices.js` and inside this file you can create a function to fetch from server.

2. Fetching
    - Queries `src/_services/local/queryService.js`
        - Custom hook that is created with react query, used for running a fetch function.  Call inside the individual component that needs the data to be rendered.  More     complete  info, please go to https://tanstack.com/query/latest/docs/react/reference/useQuery

    - Parallel fetching `src/_services/local/parallelFetching.js`
        - Contain a custom hook to `preFeth` data before fetching on individual component using `Queries` custom hook.  There are 2 custom hook,   More complete docs @                    https://tanstack.com/query/v4/docs/react/guides/prefetching
    
3. Mutating
    - Mutation `src/_services/local/mutationService.js`
        - Custom to mutate data, either updating, create new, or delete data.  Using this custom hook will also automatically trigger data update after successfull mutation.  More complete docs can be found @ https://tanstack.com/query/v4/docs/react/guides/mutations

For complete example for CRUD operation, you can play around in `Operation-Simple Operation` menu, and you can explore the code in `src\Pages\Demo\Operation\Simple\SimpleOperation.js`

---

# React Admin Panel

Admin panel with reactJS and Ant Design V5 ui library.

## Preinstalled dependencies
- antd 5.1.6
- axios 1.3.2
- dayjs 1.11.7
- react-icons 4.7.1
- react-router-dom 6.8.0
- react-country-flag 3.0.2
- @tanstack/react-query 4.24.10
- apexcharts 3.37.1
<!-- - axios-auth-refresh 3.3.6 -->
- lodash.debounce 4.0.8
- env-cmd 10.1.0

## How To Use
### Run The Project
- Clone this github repo
- Inside this folder, open terminal and run `npm install` or `npm install --legacy-peer-deps` if the first run is not successfully
- After installation is complete, just run `npm start`
- Enjoy and explore the project

### Folder Structure
- This project mostly render the component from `Demo` folder.  If you use this project and intend to put this into production, and you are not comfortable, or you want to delete all the `Demo` folder, feel free to do that, but please make sure that your project is run correctly without the folder, or you can still use the component in the `Demo` folder, and you can put the file that you want to use, put it directly in parent folder or create a new folder, check if the project run correctly, then you can remove the `Demo` folder.
- Follow the Setting below to start building your own Admin Panel inside this project

### Theme Settings
SOON

### Route Setting

---

### Data Fetching
In this project, data fetching are using axios and react-query library, you can use or modify them as you need just by following their documentation, but here i will explain how to use this project data fetching setup.

- Prerequisite
> Make a `.env` file inside your project root folder containing base path or url to make a request to your Back End service, with variable name `REACT_APP_BASE_PATH`.
- Folder name
> Root folder name for data fetching and mutating functions is called `_services`, then inside this folder there are two main folders `http` for request and `local` for queries, and also a file called `request.js` for axios instance.

- request.js
> Contain a function to create axios instance also an interceptors. There are 3 axios instance and also interceptors custom hook.  Interceptor custom hook called inside `ProtectedRoute.js` file to automatically run interceptor when any request made.

- Create Fetch function
> Create a file inside `http` folder. and make a function like
```javascript
// use privateRequest instance to make request with authorization
export const getMedicines = async () => {
    const response = await privateRequest.get(`/playground/medicines/`);
    return response.data;
};
```
> For login and register, also for fetching master data, that does not need any authorization
```javascript
// use request instance to make request without authorization
export const userLogin = async (payloadData) => {
    const { payload } = payloadData;
    const response = await request.post("/auth/v2/user/login/", payload);
    return response.data;
};
```
> To request any token rotation
```javascript
// place this function insidie try catch block and inside interceptors response
// also use authRequest instance to because it has no interceptors
// if using privateRequest you will get an endless loop if refresh token expired
const getNewAccessToken = await authRequest.get("/auth/v2/access-token/generate/");
```
> `useQueryData` with custom hook
```javascript
export const useQueryData = (queryKey, queryFn, enabled, refetchInterval, getNotify = false) => {
    const { setAccessToken } = useContext(GlobalContext);

    return useQuery({
        queryKey: queryKey, // query key from react query, to create a unique data identity
        queryFn: () => queryFn, // fetch function to called
        retry: 0, // disable fetch retry
        enabled: enabled, // set to true to enable fetching
        refetchInterval: refetchInterval, // set to automatically refetch after a set of time, use ms
        onSuccess: (results) => {
            // if needed, pass the getNotify to true
            if (results?.data && getNotify === true) {
                openNotification("authorization", "success", "Success", "Access granted");
            }
            else if (results?.data?.accessToken) {
                // use to set access token in global context, in case user refresh the browser
                // and refresh token is still valid when in production environtment
                setAccessToken(results?.data?.accessToken);
            }
        },
        onError: (error) => {
            if (getNotify === true) {
                openNotification("authorization", "error", "Error", "Requesting access...");
            }
        },
    });
};
```
> Create `useCachedData` custom hook to load cached data
```Javascript
// call this to render data from cache, so we don't need to fetch from server
export const useCachedData = (queryKey) => {
    const query = queryClientInstance.getQueryState(queryKey);

    return query;
};
```
> Then do a fetching like
```javascript
// to get and display data, 
// avoid calling to server again when page refresh, or any activity is going on on this page
const cachedData = useCachedData(["medicinesAll"]);

// to actually call the server if the cachedData is empty
useQueryData(
    // this is the query key or unique key thaht react query need
    ["medicinesAll"], 
    // this is the function to call the server, first check cachedData, if empty this function is fire
    cachedData?.data === undefined ? getMedicines() : undefined, 
    // "enabled" another react query options to enabled fetching or not
    cachedData?.data === undefined ? true : false,
    // "refetchInterval" also another react query options to refetch again if any operation intercept coz of access token expiration 
    cachedData?.data === undefined ? 1500 : 0, 
);
```

- `useQueryData` current props

| Props Name    | Default Value | Description  |
| ------------- |:-------------:| -----        |
| queryKey      | [ ] (array)   | set the data identification and use it on `useCachedData` |
| queryFn       | function      | request function |
| enabled       | false         | set to true to enable fetching
| refetchInterval | undefined   | set number in ms to do a fetch in interval
| getNotify     | false         | set true if need to show notify about fetching

---
### Mutating Data
Data mutation in this project also use axios and react-query library.  You can follow their documentation too.
> Just like `Data Fetching` you can view reusable code for mutating data inside `src/http/local/mutationService.js`.  To use that, follow `Creating reuqest` at `Data Fetching`, the call `useMutateData` function like
```javascript
const mutateData = useMutateData({
    actionType: httpMethod,
    mutateFn: httpMethod === "post" ? postMedicines : putMedicines,
    queryKey: ["medicinesAll"],
    refetchFn: () => getMedicines(),
    lsKey: undefined,
    formProps,
    setIsModalFormOpen: setIsModalFormOpen,
    routePath: undefined,
});
```
> Then to actually mutate the data, throw the function inside `onFinishForm` or other function to submit the form like
```javascript
const onFinish = (values) => {
    mutateData.mutateAsync({payload: values});
};
```
>  Inside `mutateAsync` function, there is an object param, it use to pass the form value that use as body JSON and send it to server.  You can pass any value that need to be pass to server, and to log that value, in your request function just do like
```javascript
export const userLogin = async (payloadData) => {
    const { payload } = payloadData; // here you can log the form data passing from mutateAsync function above
    const response = await privateRequest.post("/auth/user/login/", payload);
    return response.data;
};
```

- `useMutateData` current props

| Props Name    | Default Value | Description  |
| ------------- |:-------------:| -----        |
| actionType    | string        | a type of http method or other request alias, like post, put, patch, delete, login, logout, that convert to either success or error response message which not provide by the server |
| mutateFn      | function      | request function |
| queryKey      | undefined / array | to automatically update the data from `useQueryData` which has the same `queryKey` |
| lsKey         | undefined / string | whether to store response data to local storage or not, if not undefined, it will store response data with the key of the value name |
| formProps     | undefined / `useForm` | form class from antd form to clear form fields after success mutating |
| setIsModalFormOpen | undefined / false | in case you need form inside modal, pass this props to close the modal after success mutating data |
| routePath     | undefined / string | react router dom path or page url |

---