const forumModel = require('../models/forum_model');

// Lấy danh sách bài viết
async function getForumPage(req, res) {
    try {
        const forum = await forumModel.getForum();
        res.render('forum', { title: 'Forum', forum: forum });
    } catch (err) {
        console.error('Error fetching forum:', err);
        res.status(500).send('Server Error');
    }
}

// Theo dõi người bán
async function followSeller(req, res) {
    const { followerId, sellerId } = req.body;

    try {
        const result = await forumModel.followSeller(followerId, sellerId);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error following seller:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// Hủy theo dõi người bán
async function unfollowSeller(req, res) {
    const { followerId, sellerId } = req.body;

    try {
        const result = await forumModel.unfollowSeller(followerId, sellerId);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error unfollowing seller:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// Lấy danh sách người bán mà người dùng đang theo dõi
async function getFollowedSellers(req, res) {
    const { followerId } = req.query;

    try {
        const result = await forumModel.getFollowedSellers(followerId);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching followed sellers:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// Tạo bài viết mới
async function createPost(req, res) {
    const { MaNguoiBan, NoiDung } = req.body;

    if (!MaNguoiBan || !NoiDung) {
        return res.status(400).json({ error: 'Mã người bán và nội dung không được để trống.' });
    }

    try {
        const HinhAnh = req.files?.HinhAnh?.[0]
            ? `http://localhost:3000/upload/${req.files.HinhAnh[0].filename}`
            : null;

        const newPost = await forumModel.createPost({ NoiDung, MaNguoiBan, HinhAnh });
        res.status(201).json({ message: 'Đăng bài thành công.', post: newPost });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Lỗi khi đăng bài.' });
    }
}

// Cập nhật lượt thích cho bài viết
async function updateLike(req, res) {
    const { postId, like } = req.body;

    if (!postId || like === undefined) {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin bài viết hoặc trạng thái like.' });
    }

    try {
        const result = await forumModel.updateLike(postId, like);
        res.status(200).json({ success: true, message: 'Cập nhật like thành công', data: result });
    } catch (err) {
        console.error('Error updating like:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

module.exports = {
    getForumPage,
    followSeller,
    unfollowSeller,
    getFollowedSellers,
    createPost,
    updateLike,
};
