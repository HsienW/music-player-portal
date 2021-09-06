import React, {useState, useEffect} from 'react';
import {getNewReleaseAlbum, getFeaturedPlaylist} from '../../api';
import {createParamRoute} from '../../../../common/util';
import {filteredEmptyImage, authLoginChecker} from '../../../../common/util';
import {CardItem} from '../../components';
import {decorator} from '../../../../common/decorator/decorator';
import {Divider, Skeleton} from 'antd';
import './home.scss';

const HomeContainer = (props) => {
    const {observer, observerKey} = {...props};

    let [getNewReleaseApiState, changeGetNewReleaseApiState] = useState(false);
    let [newReleaseAlbumList, changeNewReleaseAlbumList] = useState([]);
    let [getFeaturedApiState, changeGetFeaturedApiState] = useState(false);
    let [featuredPlaylistList, changeFeaturedPlaylistList] = useState([]);

    useEffect(() => {
        getNewReleaseAlbum()
            .then((respond) => {
                changeNewReleaseAlbumList(filteredEmptyImage(respond['albums']['items']));
                changeGetNewReleaseApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetNewReleaseApiState(false);
            });

        getFeaturedPlaylist()
            .then((respond) => {
                changeFeaturedPlaylistList(filteredEmptyImage(respond['playlists']['items']));
                changeGetFeaturedApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetFeaturedApiState(false);
            });
    }, [changeNewReleaseAlbumList, changeFeaturedPlaylistList]);

    const homeFeaturedPlaylistItemClick = (categoriesItemInfo) => {
        let newRouteURL = createParamRoute(
            '/collection/playlist',
            {
                id: categoriesItemInfo.itemId,
                name: categoriesItemInfo.itemTitle,
                image: categoriesItemInfo.imageURL,
                artist: categoriesItemInfo.itemSubtitle
            });
        observer.doPublish(observerKey.route.routeNavigation, newRouteURL);
    };

    const homeNewReleaseAlbumItemClick = (albumItemInfo) => {
        let newRouteURL = createParamRoute(
            '/collection/album',
            {
                id: albumItemInfo.itemId,
                name: albumItemInfo.itemTitle,
                image: albumItemInfo.imageURL,
                artist: albumItemInfo.itemSubtitle
            });
        observer.doPublish(observerKey.route.routeNavigation, newRouteURL);
    };

    return (
        <>
            {
                getFeaturedApiState
                    ? <>
                        <div className={'home-container-title'}>Featured</div>
                        <Divider style={{margin: '20 0'}}/>
                        <div className={'home-container-content'}>
                            {
                                featuredPlaylistList.map((item) => {
                                    return (
                                        <CardItem
                                            key={item.id}
                                            itemId={item.id}
                                            itemTitle={item.name}
                                            itemHoverable={true}
                                            itemSubtitle={item.owner.display_name}
                                            imageURL={item.images[0].url}
                                            itemClickAction={homeFeaturedPlaylistItemClick}
                                            itemStyle={{width: 180}}
                                            itemImageClass={'custom-card-home-img-size'}
                                        >
                                        </CardItem>
                                    );
                                })
                            }
                        </div>
                    </>
                    : <Skeleton active={true}/>
            }
            {
                getNewReleaseApiState
                    ? <>
                        <div className={'home-container-title'}>New Release</div>
                        <Divider style={{margin: '20 0'}}/>
                        <div className={'home-container-content'}>
                            {
                                newReleaseAlbumList.map((item) => {
                                    return (
                                        <CardItem
                                            key={item.id}
                                            itemId={item.id}
                                            itemTitle={item.name}
                                            itemHoverable={true}
                                            itemSubtitle={item.artists[0].name}
                                            imageURL={item.images[0].url}
                                            itemClickAction={homeNewReleaseAlbumItemClick}
                                            itemStyle={{width: 180}}
                                            itemImageClass={'custom-card-home-img-size'}
                                        >
                                        </CardItem>
                                    );
                                })
                            }
                        </div>
                    </>
                    : <Skeleton active={true}/>
            }
        </>
    );
}

export const Home = decorator.before(HomeContainer, authLoginChecker);

