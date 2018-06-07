# axc
A library that offers a variety of react components written in typescript.

The scope of this project is not to provide something like bootstrap, but to create a suite of components that behave as they should, leaving the styling to the specific project in which they are deployed.

## Current components
- The api is not currently stable, so use at your own risk.
- Provided components have some basic styling for the element, such as dropdown floating elements, etc. 
- The rest of the styles remain undone for the moment, some non-required ugly stylings are provided because its easier to test the components. 

### Modal 
When open it renders the contents above an overlay, it has harcoded fade transitions between open and closed states

### Router 
Basic router to be extended, it implements a default strategy and the hooks for custom routing strategies.

### BrowserRouter
Router that implements a strategy based on a data structure similar to browser history and renders the children who's "route" prop matches partially/totally the active route.

- Uses react context api, to provide the browser history to children that require it.
Usage of history context:
Via HOC:
```javascript
    const Component // your component, defined elsewhere
    const {WithHistoryContext} = require('path/to/browserRouter.js');
    const ConnectedComponent = WithHistoryContext(Component);
    //Now ConnectedComponent has history passed as a prop.
```
Via react api:
```javascript
    const {BrowserHistoryContext} = require('path/to/browserRouter.js');
    const ConnectedComponent = (props)=>{
        return(
            <BrowserHistoryContext.Consumer>
                {history => (
                    //insert your component jsx here
                )}
            </BrowserHistoryContext.Consumer>
        )
    }
```

#### Auxiliary BrowserRouter components
They are intended to be used inside a BrowserRouter, as they are history context consumers

#### BrowserRoute
Renders the provided component/children and bootstraps history and route properties into it

#### BrowserLink 
On click pushes the provided location into BrowserRouter's history.

### Carousel
Renders a container with the provided children and with two buttons to switch the active child

### LinkedCarousel
like carousel, but also renders a link to each child

### TabContainer
Renders the active child and a button for each child.

### Dialog 
Extends modal, renders the given title, description and options inside a modal and implements hooks to listen for onClick events on the options.

### TypeWriter
Renders the text as if was being typed by a human

### AutoComplete
Costumizable input tag that implements the logic to display suggestions and the hooks to customize how those are obtained/managed


## Usage

1- clone this repository locally
2- cd to the directory where the package.json lies
3- type 'npm run build'
4- require the desired files from the dist directory into your project (assuming you're using build tools such as webpack), otherwise just include a script tag in your html pointint to the files 


## TODO
List of components that I will probably implement

- Toggable icons (think google/facebook widgets like)
- Tooltips
- I18string
- Forms with less boilerplate
- Animation components -> FadeIn/FadeOut/etc... 
- Draggable/resizable containers
- Parallax background
- Image that on focus zooms
- Components to create/visualize a custom markup similar to bbcode for forums.
- Pagination
- Component that sticks to the edge of the page
- Notification system
- Some loaders/spinners
- Data grid
- Calendar
- Wrapper of graphjs for simplicty
- Loading bars


