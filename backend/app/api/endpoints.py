from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any

router = APIRouter()

@router.get("/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint"""
    return {"status": "healthy"}

@router.get("/")
async def root() -> Dict[str, str]:
    """Root endpoint"""
    return {
        "message": "Welcome to Personal Finance Manager API",
        "version": "1.0.0",
        "docs_url": "/docs"
    }
