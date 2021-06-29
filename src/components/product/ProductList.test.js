import { render, screen } from "@testing-library/react"
import ProductList from './ProductList'
import configureStore from 'redux-m'


test('should render Maggie',()=>{
    const mockStore = configureStore()
    let store,wrapper;
    store = mockStore([])
    render(<Provider store={store}><ProductList/></Provider>)
    let ele = screen.getByText('Maggie',{exact:false})
    expect(ele).toBeInTheDocument()
})