package com.hisab.common.exception;

import com.hisab.common.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        ErrorResponse response = ErrorResponse.ofValidation(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                "Validation failed for one or more fields",
                request.getRequestURI(),
                fieldErrors
        );
        log.warn("Validation failure on [{}]: {}", request.getRequestURI(), fieldErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleNotReadable(
            HttpMessageNotReadableException ex,
            HttpServletRequest request
    ) {
        log.warn("Malformed JSON request on [{}]: {}", request.getRequestURI(), ex.getMessage());
        ErrorResponse response = ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                "Malformed JSON request payload",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({BadRequestException.class, CalculationException.class})
    public ResponseEntity<ErrorResponse> handleBadRequest(
            RuntimeException ex,
            HttpServletRequest request
    ) {
        log.warn("Bad request on [{}]: {}", request.getRequestURI(), ex.getMessage());
        ErrorResponse response = ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({ResourceNotFoundException.class, NoResourceFoundException.class})
    public ResponseEntity<ErrorResponse> handleNotFound(
            Exception ex,
            HttpServletRequest request
    ) {
        log.warn("Resource not found on [{}]: {}", request.getRequestURI(), ex.getMessage());
        ErrorResponse response = ErrorResponse.of(
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                "Resource not found: " + request.getRequestURI(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMethodNotSupported(
            HttpRequestMethodNotSupportedException ex,
            HttpServletRequest request
    ) {
        log.warn("Method not supported on [{}]: {}", request.getRequestURI(), ex.getMethod());
        ErrorResponse response = ErrorResponse.of(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                "Method Not Allowed",
                "HTTP method " + ex.getMethod() + " is not supported for this endpoint",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex,
            HttpServletRequest request
    ) {
        log.error("Unhandled error processing request [{}]: {}", request.getRequestURI(), ex.getMessage(), ex);
        ErrorResponse response = ErrorResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "An unexpected internal error occurred. Please try again later.",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
