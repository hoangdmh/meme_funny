<template>
    <div class="row">
        <div class="col-lg-8">
            <!--section-->
            <div class="ass1-section ass1-section__edit-post">
                <div class="ass1-section__content">
                    <form action="#">
                        <div class="form-group">
                            <input 
                                v-model="url_image" 
                                type="text" class="form-control ttg-border-none" placeholder="https://">
                        </div>
                        <div class="form-group">
                            <textarea 
                                v-model="post_content" 
                                type="text" class="form-control ttg-border-none" placeholder="Mô tả ..."></textarea>
                        </div>
                    </form>
                    <div class="ass1-section__image" v-on:click="uploadImage">
                        <a href="#"><img :src="renderImage" alt="default"></a>
                    </div>
                    <a href="https://imgflip.com/memegenerator" target="_blank" class="ass1-btn ass1-btn-meme">Chế ảnh từ imgflip</a>
                    
                    <input
                        v-on:change="handleUploadImage"
                        ref="fileAvatar"
                        type="file" name="avatar" class="form-control" hidden>
                    <button v-on:click="uploadImage" class="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</button>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <aside class="ass1-aside ass1-aside__edit-post">
                <div>
                    <button class="ass1-btn" @click="handleUploadPost">Đăng bài</button>
                </div>
                <div class="ass1-aside__edit-post-head">
                    <span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
                    <label class="ass1-checkbox" v-for=" item in categories" :key="item.id">
                        <input 
                            v-model="category"
                            :value="item.id"
                            type="checkbox"
                        >
                        <span></span>
                        <p>{{ item.text }}</p>
                    </label>
                </div>
                <div class="ass1-aside__get-code">
                    <p>Share Link</p>
                </div>
                <div class="ass1-aside__social">
                    <a href="" class="ass1-btn-social__facebook ass1-btn-social"><i class="fa fa-facebook"
                            aria-hidden="true"></i></a>
                    <a href="" class="ass1-btn-social__twitter ass1-btn-social"><i class="fa fa-twitter"
                            aria-hidden="true"></i></a>
                    <a href="" class="ass1-btn-social__google ass1-btn-social"><i class="fa fa-google-plus"
                            aria-hidden="true"></i></a>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { checkImageURL, checkImageFile } from '../helpers';

export default {
    name: 'post-upload',
    data() {
        return {
            obj_image: {
                objFile: null,
                base64URL: '',
            },
            url_image: '',
            post_content: '',
            category: [],
        }
    },
    computed: {
        ...mapState({
            categories: state => state.post.categories,
        }),
        renderImage(){
            if(this.url_image) return this.url_image
            else if(this.obj_image.base64URL) return this.obj_image.base64URL

            return '/dist/images/no_image_available.jpg';
        }
        
    },
    methods: {
        uploadImage() {
            let file = this.$refs.fileAvatar;
            file.click();
        },
        handleUploadImage(e){
            const fileImage = e.target.files[0];

            //Check file
            let check = checkImageFile(fileImage);

            if(!check){
                alert('File không hợp lệ?')
                return 
            }

            let reader = new FileReader();
            reader.addEventListener("load",() => {
                    let previewUrl = reader.result;
                    this.obj_image.objFile = fileImage;
                    this.obj_image.base64URL = previewUrl;
                },
                false,
            );

            if (fileImage) {
                reader.readAsDataURL(fileImage);
            }
        },
        handleUploadPost(){
            var strCategory = this.category.join(",");

            if(this.post_content && this.category){
                if(this.url_image || this.obj_image.objFile ){
                    let data = {
                        url_image: this.url_image,
                        post_content: this.post_content,
                        category: strCategory,
                    }

                    if(this.obj_image.objFile){
                        data.obj_image = this.obj_image.objFile;
                    }
                    
                    this.$store.dispatch('createNewPost', data).then(res => {
                        if(res.ok){
                            alert('Create post success!');
                            this.obj_image = {
                                objFile: null,
                                base64URL: '',
                            };
                            this.url_image = '';
                            this.post_content = '';
                            this.category = [];
                        }else {
                            alert(res.error)
                        }
                    });
                }else {
                    alert('Vui lòng chọn link bài post')
                }
            }else {
                alert('Vui lòng ngập đầy đủ nội dung')
            }
        }
    },
}
</script>

<style></style>