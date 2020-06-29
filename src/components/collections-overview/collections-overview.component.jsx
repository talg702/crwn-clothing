import React from 'react';
import { connect } from 'react-redux';

import './collections-overview.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';
import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionOverview = ({ collections }) =>{
    console.log("!!!!!!!!!!!!collections:")
    console.log(collections);
    return (
    <div className="collections-overview">
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }

    </div>
)
}

const mapPropToState = createStructuredSelector({
    collections: selectCollectionsForPreview
})
//export default CollectionOverview;
export default connect(mapPropToState)(CollectionOverview);