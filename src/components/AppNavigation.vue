<template>
    <nav>
        <ul class="ass1-header__menu">
            <li>
                <a href="#">Danh mục</a>
                <div class="ass1-header__nav" style="display: none;">
                    <div class="container">
                        <ul>
                            <li v-for="link in categories" :key="link.id">
                                <router-link 
                                    :to="getLinkCategory(link)"
                                >
                                    {{ link.text }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>

import { mapState } from 'vuex';
import {removeVietnameseFromString} from '../helpers';

export default {
    name: 'app-navigation',
    computed: {
        ...mapState({
            categories: state => state.post.categories,
        })
        // categories () {
        //     return this.$store.state.post.categories
        // }
    },
    methods: {
        getLinkCategory(category) {
            return {
                name: 'home-page', 
                query: {
                    text: removeVietnameseFromString(category.text), 
                    tagIndex: category.id 
                }
            }
        }
    },
}
</script>

<style scoped>
    .ass1-header__nav > .container ul {
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .ass1-header__nav > .container ul li {
        width: 25%;
    }
    .ass1-header__nav > .container ul li:first-child {
        margin-top: 8px;
    }
</style>