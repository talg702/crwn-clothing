import { connect } from 'react-redux';
import { compose} from 'redux';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component'
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner,    
)(CollectionsOverview);

export default CollectionOverviewContainer;