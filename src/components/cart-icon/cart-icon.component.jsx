import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import './cart-icon.styles.scss';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    console.log(toggleCartHidden)
    return (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
    )}
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => {
        console.log(toggleCartHidden);
        return dispatch(toggleCartHidden());
    }
})

const mapStateToProps = state => ({
    itemCount: selectCartItemCount(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);