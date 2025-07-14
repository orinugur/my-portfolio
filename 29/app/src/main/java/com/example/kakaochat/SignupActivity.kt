package com.example.kakaochat

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class SignupActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        val editId = findViewById<EditText>(R.id.editTextId)
        val editPw = findViewById<EditText>(R.id.editTextPassword)
        val btnSignup = findViewById<Button>(R.id.buttonSignup)

        btnSignup.setOnClickListener {
            val id = editId.text.toString()
            val pw = editPw.text.toString()
            // 실제 앱에서는 서버에 회원정보 저장 필요, 여기선 간단히 처리
            if (id.isNotBlank() && pw.isNotBlank()) {
                Toast.makeText(this, "회원가입 성공! 로그인 해주세요.", Toast.LENGTH_SHORT).show()
                finish()
            } else {
                Toast.makeText(this, "아이디/비밀번호를 입력하세요.", Toast.LENGTH_SHORT).show()
            }
        }
    }
}