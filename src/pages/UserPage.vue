<template>
    <div>
        <user-page-infor />

        <div class="ass1-section__wrap row ass1-section__isotope-init">
            <div class="grid-sizer"></div>
            <div class="ass1-section__item col-lg-6">
                <div class="ass1-section">
                    <div class="ass1-section__head">
                        <a href="single_post.html" class="ass1-section__avatar ass1-avatar"><img src="/dist/images/avatar-02.png"
                                alt=""></a>
                        <div>
                            <a href="#" class="ass1-section__name">Thanos</a>
                            <span class="ass1-section__passed">2 giờ trước</span>
                        </div>
                    </div>
                    <div class="ass1-section__content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore obcaecati eum deserunt ut,
                            aperiam quas! Placeat blanditiis consequatur, deserunt facere iusto amet a ad suscipit
                            laudantium unde quidem perferendis!</p>
                        <div class="ass1-section__image">
                            <a href="single_post.html"><img src="/dist/images/microphone-1209816_1920.jpg" alt=""></a>
                        </div>
                    </div>
                    <div class="ass1-section__footer">
                        <a href="#" class="ass1-section__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i></a>
                        <a href="#" class="ass1-section__btn-downvote ass1-btn-icon"><i class="icon-Downvote"></i></a>
                        <a href="#" class="ass1-section__btn-like ass1-btn-icon"><i
                                class="icon-Favorite_Full"></i><span>1,274</span></a>
                        <a href="#" class="ass1-section__btn-comment ass1-btn-icon"><i
                                class="icon-Comment_Full"></i><span>982</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserPageInfor from '../components/UserPageInfor'
export default {
  components: { UserPageInfor },
    name: 'user-page'
}
</script>

<style></style>