package com.expenseTracker.services;

import com.expenseTracker.dto.SignUpDto;
import com.expenseTracker.dto.UserDto;
import com.expenseTracker.entities.User;
import com.expenseTracker.respositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));
    }

    public UserDto signUp(SignUpDto signUpDto) {
        Optional<User> user = userRepository.findByEmail(signUpDto.getEmail());
        if (user.isPresent()) {
            throw new BadCredentialsException("User already exists with email: " + signUpDto.getEmail());
        }

        User toBeCreatedUser = modelMapper.map(signUpDto, User.class);
        toBeCreatedUser.setPassword(passwordEncoder.encode(toBeCreatedUser.getPassword()));
        User savedUser = userRepository.save(toBeCreatedUser);
        return modelMapper.map(savedUser, UserDto.class);
    }
}
