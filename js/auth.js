// 모든 페이지에서 실행

function islogin(){
    const user = localStorage.getItem("user");
    if (!user){
        window.location.href = "index.html";
    }
}
function islogined(){
    const user = localStorage.getItem("user");
    if (user){
        window.location.href = "travel.html";
    }
}
//document.addEventListener("DOMContentLoaded", checkLogin);

import { supabase } from "./supabase.js";

// ✅ 로그인 함수
async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert("로그인 실패: " + error.message);
        return;
    }
    localStorage.setItem("user", JSON.stringify(data.user.id)); // ✅ 로그인 상태 저장
    window.location.href = "travel.html";
}

// ✅ 회원가입 함수
async function signup(email, password, username) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert("회원가입 실패: " + error.message);
        return;
    }

    const user = data.user;
    if (!user){
        alert("회원 정보를 가져오는데 실패했습니다.");
        return;
    }

    const { error: insertError } = await supabase
        .from('userinfo')
        .insert([{ id: user.id, email: user.email, username: username }]);
      if (insertError) {
        alert("닉네임 등록 실패: " + insertError.message);
      }
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    window.location.href = "index.html";
}

async function checkNickname(username) {
    const { data, error } = await supabase
        .from("userinfo")
        .select("username")
        .eq("username", username);

    if (error) {
        alert("닉네임 확인 중 오류 발생: " + error.message);
        return;
    }

    if (data.length > 0) {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
        return false;
    } else {
        alert("사용 가능한 닉네임입니다!");
        return true;
    }
}

// ✅ 로그인 상태 확인 함수
async function checkLogin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = "index.html";  // 로그인 안 됐으면 로그인 페이지로 이동
        return false;
    }
    return true;
}

async function logout() {
    await supabase.auth.signOut();
    alert('로그아웃되었습니다.');
    localStorage.removeItem("user");
    islogin();
}

async function createPost(title,content,currentUser) {
    const {error} = await supabase
        .from('posts')
        .insert([{ title: title ,content: content, user_id: currentUser }]);
    if(error){
        return error;
    }
    
}

async function loadPosts() {
    // posts 테이블과 userinfo 테이블을 조인하여 username 가져오기
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`*, userinfo : userinfo(username)`)
      .order('id', { ascending: false });
    if (error) {
      console.error("게시물 불러오기 실패:", error);
      return error;
    }
    return posts;
}

async function editPost_auth(postId, newTitle, newContent) {
    try {
        // 'posts' 테이블에서 해당 postId에 맞는 게시물을 수정합니다.
        const { data, error } = await supabase
            .from('posts')
            .update({ title: newTitle, content: newContent })
            .eq('id', postId); // postId로 해당 게시물 찾기

        if (error) {
            throw error;
        }

        return data; // 수정된 데이터 반환
    } catch (error) {
        console.error("게시물 수정 실패:", error);
        return { error };
    }
}

async function deletePost_auth(postId) {
    try {
        // 'posts' 테이블에서 해당 postId에 맞는 게시물을 삭제합니다.
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId); // postId로 해당 게시물 찾기

        if (error) {
            throw error;
        }

        return data; // 삭제된 데이터 반환
    } catch (error) {
        console.error("게시물 삭제 실패:", error);
        return { error };
    }
}

async function updatePost_auth(postId, newTitle, newContent) {
    const { data, error } = await supabase
        .from('posts')
        .update({ title: newTitle, content: newContent, created_at : new Date().toISOString() })
        .eq('id', postId);

    if (error) {
        console.error('게시물 수정 실패:', error);
        return error;
    }

    return data;
}


export {loadPosts, createPost, signup, login, logout, checkLogin, checkNickname,islogin, islogined, editPost_auth, deletePost_auth, updatePost_auth};
