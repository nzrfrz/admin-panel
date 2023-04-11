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