const db = require('../models');
const User = db.User;
const Op = db.sequelize.Op;
const jwt = require('jsonwebtoken');

// 회원가입
exports.signUp = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    }

    // 중복 회원 검증 (loginId)
    const loginId = req.body.loginId;
    const duplicatedUser = await User.findOne({
        where: {
            loginId: loginId
        }
    });

    console.log(duplicatedUser);

    if(duplicatedUser) {
        res.status(400).send({
            message: "중복된 아이디 입니다"
        });
        return;
    };

    // 회원 저장
    const user = {
        loginId: req.body.loginId,
        loginPw: req.body.loginPw,
        username: req.body.username,
        nickname: req.body.nickname
    };

    User.create(user)
        .then(data => {
            res.status(200).send({
                userId: data.id,
                username: data.username,
                nickname: data.nickname
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            })
        })
};

// 로그인
exports.login = async (req, res) => {

    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    }

    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;

    const findUser = await User.findOne({
        where: {
            loginId: loginId
        }
    });
    if(findUser == null) {
        res.status(400).send({
            message: "존재하지 않는 회원입니다"
        })
    }

    const loginUser = await User.findOne({
        where: {
            loginId: loginId,
            loginPw: loginPw
        }
    });

    if(loginUser == null) {
        res.status(400).send({
            message: "아이디 또는 비밀번호가 일치하지 않습니다"
        })
    }else {
        const options = {
            domain: 'localhost',
            path: '/',
            httpOnly: true
        }

        const token = jwt.sign({
            id: loginUser.id,
            loginId: loginUser.loginId,
        }, "abc1234567", {
            expiresIn: "30m",
            issuer: "gowebproject"
        });

        res.cookie('token', token, options); // cookie
        res.status(200).send({
            userId: loginUser.id,
            username: loginUser.username,
            nickname: loginUser.nickname
        })
    }
}

// 로그인 한 사용자 정보 가져오기
exports.getAccount = (req, res) => {

    console.log(req.cookies.token);

    if(req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, "abc1234567", async (err, decoded) => {
            if(err) {
                return res.send(401);
            }

            const userId = decoded.id;
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });
            res.send({
                id: user.id,
                username: user.username,
                nickname: user.nickname
            })
        })
    }
    else {
        res.sendStatus(401);
    }
}

// 로그아웃
exports.logout = (req, res) => {
    if(req.cookies && req.cookies.token) {
        res.clearCookie("token");
    }
    res.sendStatus(200);
}


// 회원 전체 조회
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'some error occurred while retrieving show posts'
            });
        })
};